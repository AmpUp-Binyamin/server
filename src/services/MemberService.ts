import MemberController from "../controllers/MemberControllers";
import AddMemberRequest from "../dto/member/AddMemberRequest";
import IMember from "../interfaces/IMember";


export default class MemberService {

    static controller = new MemberController();

    static async getsingelMember(id: string): Promise<IMember | null> {
        return await this.controller.readOne(id)
    }
    
    static async getsingelMemberChallenges(id: string): Promise<IMember | null> {
        return await this.controller.readWithChallenge(id)
    }

    

    static async createNewMember(data : AddMemberRequest): Promise<IMember | null> { 
        let newMember : IMember = {
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
        return await this.controller.create(newMember)
    }
}