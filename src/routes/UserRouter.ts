import { Request, Response, Router } from 'express'
import UserService from '../services/UserService'
import AddUserRequest from '../dto/user/AddUserRequest'
import { Mapper } from '../helpers/Mapper'
import IUser from '../interfaces/IUser'
const router = Router()


router.get('/:userId', async (req:Request, res:Response) => {
    try{
        let user = await UserService.getSingleUser(req.params.userId)
        res.send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})
router.post('/', async (req:Request, res:Response) => {
    try{
        // TODO: mapper
        let x : AddUserRequest = {
            fullName: '',
            email: 0
        }
      
        // https://medium.com/@mokremiz/building-a-flexible-dto-mapper-for-react-and-next-js-projects-3ee77055f05d
        let request = Mapper<AddUserRequest>(x, req.body)
        console.log("request:",request);
        
        //  new AddUserRequest(req.body.fullName,req.body.email)
        let user= await UserService.createNewUser(request)
        res.send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})


export default router;