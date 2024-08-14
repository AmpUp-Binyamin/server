// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import {IDeck} from '../interfaces/IDeck';
import DeckModel from '../models/DeckModel'

export default class DeckController implements IController<IDeck> {
    async create(data: IDeck): Promise<IDeck> {
        return await DeckModel.create(data)
    }
    async read(filter: FilterQuery<IDeck>): Promise<IDeck[]> {
        return await DeckModel.find(filter)
    }
    async readOne(id: string): Promise<IDeck | null> {
        return await DeckModel.findById(id)
    }
    async update(id: string, data: Partial<IDeck>): Promise<IDeck | null> {
        await DeckModel.updateOne({_id:id},data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        const result = await DeckModel.updateOne({ _id: id }, { isActive: false });
        return result.modifiedCount > 0;
    }
}


