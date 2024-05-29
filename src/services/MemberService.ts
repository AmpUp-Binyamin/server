import MemberController from "../controllers/MemberControllers";
import AddMemberRequest from "../dto/member/AddMemberRequest";
import IMember from "../interfaces/IMember";


export default class MemberService {

    static controller = new MemberController();
    static async getsingelMember(id: string): Promise<IMember | null> {
        return await this.controller.readOne(id)
    }

    static async getPersonalInfo(id: string): Promise<IMember | null> {
        const memberInfo: IMember | null = await this.controller.readOneProj(id, '-coins -notifications -_id')
        return memberInfo
    }

    static async createNewMember(data: AddMemberRequest): Promise<IMember | null> {
        let newMember: IMember = {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            img: data.img,
            link: data.link,
            linksToSocialNetwork: data.linkToSocialNetworks,
            myChallenge: data.myChallenge,
            coins: data.coins,
            notifications: data.notifications
        }
        console.log(newMember)
        return await this.controller.create(newMember)
    }
}