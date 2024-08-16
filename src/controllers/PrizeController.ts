// src\controllers\PrizeController.ts
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IPrize from '../interfaces/IPrize';
import PrizeModel from '../models/PrizeModel';

export default class PrizeController implements IController<IPrize> {
  async create(data: IPrize): Promise<IPrize> {
    return await PrizeModel.create(data);
  }
  async read(filter: FilterQuery<IPrize>): Promise<IPrize[]> {
    return await PrizeModel.find(filter);
  }
  async readOne(id: string): Promise<IPrize | null> {
    return await PrizeModel.findById(id);
  }
  async update(id: string, data: Partial<IPrize>): Promise<IPrize | null> {
    await PrizeModel.updateOne({ _id: id }, data);
    return await this.readOne(id);
  }
  async del(id: string): Promise<boolean> {
    const result = await PrizeModel.updateOne({ _id: id }, { isActive: false });
    return result.modifiedCount > 0;
  }
}
