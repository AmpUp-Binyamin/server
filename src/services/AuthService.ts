import MemberController from "../controllers/MemberControllers";
import activeChallengeController from "../controllers/ActiveChallengeController"
import { ObjectId } from "mongoose";
import { createToken } from "../middleware/auth"
import { Code } from "mongodb";

export default class AuthService {
    static MemberController = new MemberController();
    static async checkEmail(body: { email: string, name: string, picture: string }) {
        let fullName = body.name
        let img = body.picture
        let email = body.email

        let member = (await this.MemberController.read({ email }))[0]
        let myActivChallenge: any = []
        if (member) {
            if (!member.fullName) { await this.MemberController.update(member.id, { fullName }) }
            if (!member.img) { await this.MemberController.update(member.id, { img }) }
            let myChallenge = member.myChallenge
            await Promise.all(myChallenge.map(async challengeId => {
                let memberActivChaleng = await AuthService.checkActivChaleng(challengeId as ObjectId)
                if (memberActivChaleng.length > 0) {
                    myActivChallenge.push(memberActivChaleng[0])
                }
            }))
        }

        let invited = await AuthService.findInvitedActivChaleng(email)
        if (invited.length > 0) {
            console.log({ invited: invited });
            if (!member) {
                await this.MemberController.create({
                    email: email,
                    fullName: fullName,
                    img: img,
                    myChallenge: [],
                    coins: 0,
                    notifications: [],
                    myActiveChallenge: [],
                    myInvites: [],
                    myCoins: [],
                })
            }
            myActivChallenge.push({ invited })
        }

        member = (await this.MemberController.read({ email }))[0]
        if (member == undefined) { throw ({ status: 407, msg: "mamber not exist" }) }
        const token = createToken({ userId: member.id, userPermission: "user" })
        return ({ myActivChallenge, member, token })
    }

    static activeChallengeController = new activeChallengeController();

    static async checkActivChaleng(challenge: ObjectId) {
        return await this.activeChallengeController.read({ challenge })
    }
    static async findInvitedActivChaleng(email: string) {
        return await this.activeChallengeController.read({ invited: email })
    }
}