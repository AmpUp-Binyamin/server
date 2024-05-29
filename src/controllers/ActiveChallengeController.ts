import mongoose, { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IActiveChallenge from '../interfaces/IActiveChallenge';
import ActiveChallengeModel from '../models/ActiveChallengeModel';

export default class activeChallengeController implements IController<IActiveChallenge> {
    async create(data: IActiveChallenge): Promise<IActiveChallenge> {
        return await ActiveChallengeModel.create(data)
    }
    async read(filter: FilterQuery<IActiveChallenge>): Promise<IActiveChallenge[]> {
        return await ActiveChallengeModel.find(filter)
    }
    async readOne(id: string , populate?: string | undefined): Promise<IActiveChallenge | null> { //@ts-ignore
       return await ActiveChallengeModel.findById({ _id: id })
       //.populate?(populate) //@ts-ignore
         
    } //@ts-ignore
    async update(id: string, data: Partial<IActiveChallenge>): Promise<IActiveChallenge | null> {
        await ActiveChallengeModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }

    del(id: string): Promise<boolean> { //unimplemented
        throw new Error('Method not implemented.');
    }

}