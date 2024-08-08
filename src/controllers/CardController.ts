// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import ICard from '../interfaces/ICard';
import CardModel from '../models/CardModel'

export default class CardController implements IController<ICard> {
    async create(data: ICard): Promise<ICard> {
        return await CardModel.create(data)
    }
    async read(filter: FilterQuery<ICard>): Promise<ICard[]> {
        return await CardModel.find(filter)
    }
    async readOne(id: string): Promise<ICard | null> {
        return await CardModel.findById(id)
    }
    async update(id: string, data: Partial<ICard>): Promise<ICard | null> {
        await CardModel.updateOne({_id:id},data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}


