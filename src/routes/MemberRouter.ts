import { Request, Response, Router } from 'express'
import AddMemberRequest from '../dto/member/AddMemberRequest';
import MemberService from "../services/MemberService";
import { Mapper } from '../helpers/Mapper'
import jwt from 'jsonwebtoken';
import createToken from '../middleware/createToken'
const router = Router()

router.get('/info/:memberId', async (req: Request, res: Response) => {
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

export default router