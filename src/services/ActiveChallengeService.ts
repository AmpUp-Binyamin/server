import { ObjectId } from "mongodb"
import activeChallengeController from "../controllers/ActiveChallengeController"
import MemberController from "../controllers/MemberControllers"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import { RandomNumberGenerator } from "../helpers/luck"
import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge"
import IMember from "../interfaces/IMember"
import ICard from "../interfaces/ICard"

export default class ActiveChallegeService {
    static controller = new activeChallengeController()
    static RandomGenerator = new RandomNumberGenerator()
    static memberController = new MemberController()
    static async getSingleActiveChallenge(id: string): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id)
    }
    static async createNewActiveChallenge(data: any): Promise<IActiveChallenge> {
        if (!data.challenge) {
            throw { code: 400, msg: "challenge not found" }
        }
        if (!data.startDate) {
            throw { code: 400, msg: "start date not found" }
        }
        let newActiveChallenge: IActiveChallenge = {
            coach: data.userId,
            challenge: data.challenge,
            participants: [],
            startDate: data.startDate,
            cards: []
        }
        return await this.controller.create(newActiveChallenge)
    }



    static async loveCard(challengeId: string): Promise<any> {

        let challenge = await this.controller.readOne(challengeId, 'participants')
        if (!challenge) throw { code: 400, message: "go to hell!!!" };
        let num = challenge.participants?.length
        let user = challenge.participants[this.RandomGenerator.getRandom(0, num - 1)];


        //     const chosenMember = await this.memberController.readOne((user))
        //     let memberId = chosenMember?._id
        this.positiveStreakCheck(user, challenge)
    }

    // recieves the "loveCard" winning memberID and the same challenge, should check and return if the member have a positive streak  
    static async positiveStreakCheck(memberId: ObjectId | String, activeChallenge: IActiveChallenge) {
        const memberIdStr = typeof memberId === 'string' ? memberId : memberId.toString()
        console.log("Chosen Member Id", memberIdStr);
        //------------------------------------- the full list of all the member's cards in this particular challenge
        const memberAnsweredCards: IActiveCard[] = activeChallenge.cards.reduce((prev: IActiveCard[], current: IActiveCard) => {
            const currentMemberIdStr = current.member.toString()
            if (currentMemberIdStr === memberIdStr) {
                prev.push(current)
            }
            return prev
        }, [])
        // console.log({ memberAnsweredCards }); 

        //----------------------------an object including a key as the number of the day, and a value of how many answers on that day
        //----------------------------example: {1:4, 2:5, 3:6, 4:6, 5:6}, 6 is not here, meaning he did not answered at day number 6
        const answeredDays: { [key: number]: number } = {}
        memberAnsweredCards.forEach(card => {
            let day = card.challengeDay
            if (answeredDays[day]) {
                answeredDays[day]++
            } else {
                answeredDays[day] = 1
            }
        })
        console.log({ answeredDays });
        console.log(Object.keys(answeredDays));

        //------------------------------------list of the days answered, for example [day1, day2 , day4 , day7]
        let answeredDaysList = Object.keys(answeredDays)

        if (answeredDaysList.length < 5) {
            console.log("Member does not have a streak of 5 or more");
            return "Member does not have a streak of 5 or more"
        }
        // console.log(answeredDays);
        const mostRecentAnswerDay: number = Number(answeredDaysList.slice(-1)[0])

        let streakCounter = 1

        console.log(mostRecentAnswerDay);

        // SAVE HOW MANY HE DID IN EACH DAY AND THEN COMPARE IT TO THE NUMBERS IN THE CHALLENGE ITSELF
        for (let i = (mostRecentAnswerDay - 1); i > 0; i--) {
            if (i === Number(answeredDaysList[i - 1])) {
                console.log(answeredDaysList[i - 1]);
                streakCounter++
            } else {
                console.log("Member missed a day! not eligible");
                return "Member missed a day! not eligible"
            }
            if (streakCounter === 5) {
                console.log("Member is on a streak of 5 days!!");
                return "Member is on a streak of 5 days!!"
            }
        }
    }

}
// TODO: ADD IN THE SCHEMA HOW MANY CARDS ARE SUPPOSED TO BE IN EACH DAY,
// TO ENABLE CHECK OF HOW MANY CARDS ANSWERED PER DAY (COMPLETE/INCOMPLETE)



