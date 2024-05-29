import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IMember from '../interfaces/IMember';
import MemberModel from '../models/MemberModel';
import ActiveChallengeModel from '../models/ActiveChallengeModel'
import IActiveChallenge from '../interfaces/IActiveChallenge';

export default class MemberController implements IController<IMember> {
    async create(data: IMember): Promise<IMember> {
        return await MemberModel.create(data)
    }
    async read(filter: FilterQuery<IMember>): Promise<IMember[]> {
        return await MemberModel.find(filter)
    }
    async readOne(id: string): Promise<IMember | null> {
        return await MemberModel.findById(id)
    }
    async readWithChallenge(id: string): Promise<IMember | null> {
        return await MemberModel.findById(id)
            .populate({
                path: 'myChallenge',
                select: 'challengeName creator duration cards.title cards.day cards.image cards.cardType  cards._id',
                populate: [{ path: 'creator', select: 'fullName picture' }]
            }).lean()
    }
    async readStartDate(id: string): Promise<IActiveChallenge | null> {
        const activeChallenge = await ActiveChallengeModel.findOne({ challenge: id }, 'startDate cards');
        if (!activeChallenge) {
            throw new Error('Active challenge not found');
        }
        return activeChallenge;
    }





    async update(id: string, data: Partial<IMember>): Promise<IMember | null> {
        await MemberModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
