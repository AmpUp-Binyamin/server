import { Request, Response, Router } from 'express'
import MemberService from '../services/MemberService'
import { Mapper } from '../helpers/Mapper'
import UpdateMemberRequest from '../dto/member/UpdateMemberRequest'
import createToken from '../middleware/createToken'
import AddMemberRequest from '../dto/member/AddMemberRequest'
import GetMemberStoreCardsRes  from '../dto/member/GetMemberStoreCardsRes'
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

router.get('/:memberId/myCards/:activeChallengeId', async (req: Request, res: Response) => {
    try {
        const memberId = req.params.memberId
        const activeChallengeId = req.params.activeChallengeId        
        let cardsArr = await MemberService.getStoreCardsPreMember(memberId, activeChallengeId)
        res.send(cardsArr)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

export default router;