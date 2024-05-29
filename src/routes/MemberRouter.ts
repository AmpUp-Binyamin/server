import { Request, Response, Router } from 'express'
import MemberService from '../services/MemberService'
import { Mapper } from '../helpers/Mapper'
import UpdateMemberRequest from '../dto/member/UpdateMemberRequest'

const router = Router()


// router.get('/', async (req: Request, res: Response) => {
//     try {
//         let user = ''
//         res.send(user)
//     }
//     catch (error) {
//         res.status(400).send(error)
//     }
// })



router.put('/member/personal-info', async (req: Request, res: Response) => {
    try {
        let request = Mapper<UpdateMemberRequest>(new (UpdateMemberRequest), req.body)
        let userUpdate = await MemberService.updateMember(request)
        res.send(userUpdate)
    }
    catch (error) {
        res.status(400).send(error)
    }
})


export default router;