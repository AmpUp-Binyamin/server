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
                    myActivChallenge.push( memberActivChaleng[0] )
                }
            }))
        }

        let invited = await AuthService.findInvitedActivChaleng(email)
<<<<<<< HEAD


=======
>>>>>>> 3a3160d0a74c3b1d2f9737ff9bbf55cee473c84c
        if (invited.length > 0) {
            console.log({ invited: invited });
            if (!member) {
                await this.MemberController.create({
                    email: email,
                    fullName: fullName,
                    img: img,
                    myChallenge: [],
                    coins: 0,
                    notifications: []
                })
            }
            myActivChallenge.push({ invited })
        }

        member = (await this.MemberController.read({ email }))[0]
<<<<<<< HEAD
        if (member == undefined) { throw ({ status: 407, msg: "mamber not exist" }) }
        console.log({ member: member });
        const token = createToken({ userId: member.id, userPermission: "user" })
=======
       if (member == undefined) {throw({status:407,msg:"mamber not exist"})}
        const token = createToken( {userId:member.id ,userPermission: "user"})
>>>>>>> 3a3160d0a74c3b1d2f9737ff9bbf55cee473c84c
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