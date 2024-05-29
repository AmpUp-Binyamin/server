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
// mayby move to storeRouter?? 
router.put('/:storeItemId', async (req: Request, res: Response) => {
    try {
       let memberId = req.body.memberId
       let storeItemId = req.params.storeItemId
       let toBuy = await MemberService.updateMemberItems(memberId,storeItemId)
        res.send("ok")
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

// router.get('/personal-info', async (req: Request, res: Response) => {
//     try {
//         const destructuredUserTokenId = '6656df1b8437151db0cce4e2'
//         const memberInfo = await MemberService.getPersonalInfo(destructuredUserTokenId)
//         res.send(memberInfo)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

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

export default router;