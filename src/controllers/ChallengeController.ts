import { FilterQuery } from "mongoose";
import IChallenge from "../interfaces/IChallenge";
import IController from "../interfaces/IController";
import ChallengeModel from "../models/ChallengeModel";
import UserModel from "../models/UserModel";
import ICard from "../interfaces/ICard";


export default class ChallengeController implements IController<IChallenge> {
    async create(data: IChallenge): Promise<IChallenge> {
        return await ChallengeModel.create(data)
    }

    async read(filter: FilterQuery<IChallenge>): Promise<IChallenge[]> {
        return await ChallengeModel.find(filter)
    }

    async readOne(id: string): Promise<IChallenge | null> {
        return await ChallengeModel.findById(id)
    }

    async update(id: string, data: Partial<IChallenge>): Promise<IChallenge | null> {
        await ChallengeModel.updateOne({_id:id}, data)
        return await this.readOne(id)
    }

    async del(id: string): Promise<boolean> {
        await ChallengeModel.deleteOne({_id:id})
        return true
    }
}


















