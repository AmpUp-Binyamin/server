// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IFeedBack from '../interfaces/IFeedBack';
import FeedBackModel from '../models/FeedBackModel'

export default class FeedBackController implements IController<IFeedBack> {
    async create(data: IFeedBack): Promise<IFeedBack> {
        return await FeedBackModel.create(data)
    }
    async read(filter: FilterQuery<IFeedBack>): Promise<IFeedBack[]> {
        return await FeedBackModel.find(filter)
    }
    async readOne(id: string): Promise<IFeedBack | null> {
        return await FeedBackModel.findById(id)
    }
    async update(id: string, data: Partial<IFeedBack>): Promise<IFeedBack | null> {
        await FeedBackModel.updateOne({_id:id},data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}


