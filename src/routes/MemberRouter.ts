import { Request, Response, Router } from 'express'
import AddMemberRequest from '../dto/member/AddMemberRequest';
import MemberService from "../services/MemberService";
import { Mapper } from '../helpers/Mapper'
const router = Router()



router.get('/:memberId', async (req:Request, res:Response) => {
    try{
        let member = await MemberService.getsingelMember(req.params.memberId)    
        console.log(member)
        res.send(member)
    }
    catch(error){   
        res.status(400).send(error)
    }
})


router.post('/', async (req:Request, res:Response) => {
    try {
        let request = Mapper<AddMemberRequest>(new AddMemberRequest(), req.body)
        let member = await MemberService.createNewMember(request)
        res.send(member)
    } catch(error){
        res.status(400).send(error)
    }
})



export default router;