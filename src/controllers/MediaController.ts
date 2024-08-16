// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IMedia from '../interfaces/IMedia';
import MediaModel from '../models/MediaModel';

export default class MediaController implements IController<IMedia> {
  async create(data: IMedia): Promise<IMedia> {
    return await MediaModel.create(data);
  }
  async read(filter: FilterQuery<IMedia>): Promise<IMedia[]> {
    return await MediaModel.find(filter);
  }
  async readOne(id: string): Promise<IMedia | null> {
    return await MediaModel.findById(id);
  }
  async update(id: string, data: Partial<IMedia>): Promise<IMedia | null> {
    await MediaModel.updateOne({ _id: id }, data);
    return await this.readOne(id);
  }
  async del(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
