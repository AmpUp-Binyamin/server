// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IAnswer from '../interfaces/IAnswer';
import AnswerModel from '../models/AnswerModel';

export default class AnswerController implements IController<IAnswer> {
  async create(data: IAnswer): Promise<IAnswer> {
    return await AnswerModel.create(data);
  }
  async read(filter: FilterQuery<IAnswer>): Promise<IAnswer[]> {
    return await AnswerModel.find(filter);
  }
  async readOne(id: string): Promise<IAnswer | null> {
    return await AnswerModel.findById(id);
  }
  async update(id: string, data: Partial<IAnswer>): Promise<IAnswer | null> {
    await AnswerModel.updateOne({ _id: id }, data);
    return await this.readOne(id);
  }
  async del(id: string): Promise<boolean> {
    const result = await AnswerModel.updateOne(
      { _id: id },
      { isActive: false },
    );
    return result.modifiedCount > 0;
  }
}
