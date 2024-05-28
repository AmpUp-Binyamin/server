import { FilterQuery } from 'mongoose';
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
    async readOne(id: string): Promise<IActiveChallenge | null> {
        return await ActiveChallengeModel.findById({ _id: id })
    }
    async update(id: string, data: Partial<IActiveChallenge>): Promise<IActiveChallenge | null> {
        await ActiveChallengeModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }

    del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}