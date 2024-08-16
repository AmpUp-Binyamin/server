// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IStore from '../interfaces/IStore';
import StoreModel from '../models/StoreModel';

export default class StoreController implements IController<IStore> {
  async create(data: IStore): Promise<IStore> {
    return await StoreModel.create(data);
  }
  async read(filter: FilterQuery<IStore>): Promise<IStore[]> {
    return await StoreModel.find(filter);
  }
  async readOne(id: string): Promise<IStore | null> {
    return await StoreModel.findById(id);
  }
  async update(id: string, data: Partial<IStore>): Promise<IStore | null> {
    await StoreModel.updateOne({ _id: id }, data);
    return await this.readOne(id);
  }
  async del(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
