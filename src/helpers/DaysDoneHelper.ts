import { ObjectId } from "mongoose";
import IActiveChallenge, { IActiveCard } from "../interfaces/IActiveChallenge";

export class DaysDoneHelper {

    checkPositiveStreak(DaysObject: Object, streakNumber: number) {
        let answeredDaysList = Object.keys(DaysObject)

        if (answeredDaysList.length < streakNumber) {
            console.log(`Member does not have a streak of ${streakNumber} or more`);
            return `Member does not have a streak of ${streakNumber} or more`
        }
        const mostRecentAnswerDay: number = Number(answeredDaysList.slice(-1)[0])

        let streakCounter = 1

        console.log(mostRecentAnswerDay);

        // SAVE HOW MANY MEMBER HAS DONE IN EACH DAY AND THEN COMPARE IT TO THE NUMBERS IN THE CHALLENGE ITSELF
        for (let i = (mostRecentAnswerDay - 1); i > 0; i--) {
            if (i === Number(answeredDaysList[i - 1])) {
                console.log(answeredDaysList[i - 1]);
                streakCounter++
            } else {
                console.log("Member missed a day! not eligible");
                return "Member missed a day! not eligible"
            }
            if (streakCounter === streakNumber) {
                console.log(`Member is on a streak of ${streakNumber} days!!`);
                return `${streakNumber}`
            }
        }
    }

    checkNegativeStreakEnd(DaysObject: Object, streakNumber: number) {
        //----------------------a flat array of the days the Member answered 
        //---------------------- example : [1,5,7,9] < the member answered(partialy or completely), days 1, 5 ,7, 9
        let daysList = Object.keys(DaysObject)
        console.log(daysList);
        let numberTypeDaysList = []
        for (let i = 0; i < daysList.length; i++) {
            numberTypeDaysList.push(parseInt(daysList[i]))
        }
        const mostRecentAnswerDay: number = numberTypeDaysList.slice(-1)[0]
        console.log({ mostRecentAnswerDay });

        let i = numberTypeDaysList.length
        console.log(numberTypeDaysList[i - 1]);
        console.log(numberTypeDaysList[i - 2]);

        if (numberTypeDaysList[i - 1] && numberTypeDaysList[i - 2]) {
            if (Math.abs(numberTypeDaysList[i - 1] - numberTypeDaysList[i - 2]) >= streakNumber) {
                console.log();
                return `Member returned after ${streakNumber} days!`
            } else {
                console.log("Member does not have a negative streak from today");
                return "Member does not have a negative streak from today"
            }
        }



    }


    getDaysAndDaysToBeDoneObject<T extends Record<K, number>, K extends keyof T>(objectList: T[], pointerKey: K) {
        const newObjectList: { [key: number]: number } = {}
        objectList.forEach(object => {
            let key = object[pointerKey]
            if (typeof key === "number") {

                if (newObjectList[key]) {
                    newObjectList[key]++
                } else {
                    newObjectList[key] = 1
                }
            }
        })
        console.log(newObjectList);

        return newObjectList
    }

    getMemberCardsArray(memberId: ObjectId, activeChallenge: IActiveChallenge) {
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

        return memberAnsweredCards
    }
}