import { Request, Response, Router } from 'express'
import MemberService from '../services/MemberService'
import { Mapper } from '../helpers/Mapper'
import UpdateMemberRequest from '../dto/member/UpdateMemberRequest'
import createToken from '../middleware/createToken'
import AddMemberRequest from '../dto/member/AddMemberRequest'
const router = Router()

router.put('/personal-info', async (req: Request, res: Response) => {
    try {
        let request = Mapper<UpdateMemberRequest>(new (UpdateMemberRequest), req.body)
        let userUpdate = await MemberService.updateMember(request)
        res.send(userUpdate)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:memberId', async (req: Request, res: Response) => {
    try {
        let member = await MemberService.getsingelMember(req.params.memberId)
        console.log(member)
        res.send(member)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/personal-info', async (req: Request, res: Response) => {
    try {
        const destructuredUserTokenId = '6656df1b8437151db0cce4e2'
        const memberInfo = await MemberService.getPersonalInfo(destructuredUserTokenId)
        res.send(memberInfo)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const request = Mapper<AddMemberRequest>(new AddMemberRequest(), req.body);
        
        const newMember = await MemberService.createNewMember(request);
        
        const token = createToken({ userId: newMember?.id, userPermission: 'user' });
        console.log(token)
        res.json({ token, newMember });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// קבלת היוזר על פי טוקן
router.get('/token/toMember', async (req: Request, res: Response) => {
    try {
        let member = await MemberService.getsingelMember(req.body.userId);
        res.send(member);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

// שירות שמביא את כל האתגרים - האקטייבים ושלא
// מחזיר את המידע עם תאריכים, מאמן, תמונה וכו'

router.get('/personal-info/challenges', async (req: Request, res: Response) => {
    try {
        let userId = req.body.userId
        let memberChallenges = await MemberService.getMemberChallenges(userId)
        res.send(memberChallenges)
    } catch (error) {
        console.log({ error });
        res.status(400).send(error)
    }
})

export default router;

// static async getMemberChallenges(id: string): Promise<IChallenge[] | null> {
//     let member = await this.memberController.readWithChallenge(id, "myActiveChallenge")
//     let member = await this.memberController.readWithChallenge(id, "myChallenge")
//     if (!member) {
//         return null;
//     }
//     let memberChallenges = member?.myChallenge as IChallenge[]
    
//     if (!memberChallenges.length) {
//         return null;
//     }

//     let startDates: Array<IActiveChallenge | null> = await Promise.all(
//         memberChallenges.map((ch) => {
//             const challengeId = (ch as { _id: ObjectId })._id.toString();
//             return this.memberController.readStartDate(challengeId);

//         })
//     );

//     let finel = memberChallenges.map((ch, index) => ({
//         ...ch,
//         challengeId: ch._id,
//         startDate: this.formatDate(startDates[index]?.startDate),
//         endDate: this.calculateEndDate(startDates[index]?.startDate, ch.duration),
//         cards: ch.cards
//             .map((card) => ({
//                 ...card,
//                 date: this.calculateEndDate(startDates[index]?.startDate, card.day)
//             }))
//             .filter((card) => {
//                 if (typeof card.date === 'string') {
//                     const dateObj = new Date(card.date);
//                     if (!isNaN(dateObj.getTime())) {
//                         return this.isDateBeforeToday(dateObj);
//                     }
//                     if (dateObj === new Date()) {
//                         startDates[index]?.cards.find(c => {
//                             if (String(c.member) === id) {
//                                 return c
//                             }
//                         })
//                     }
//                 }
//                 return false;
//             }).filter((card) => card.cardType === "study")
//     }));
//     return finel;
// }