// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import IChallenge from '../interfaces/IChallenge';
import ChallengeModel from '../models/ChallengeModel';

export default class ChallengeController implements IController<IChallenge> {
  async create(data: IChallenge): Promise<IChallenge> {
    return await ChallengeModel.create(data);
  }
  async read(filter: FilterQuery<IChallenge>): Promise<IChallenge[]> {
    return await ChallengeModel.find(filter);
  }
  async readOne(id: string): Promise<IChallenge | null> {
    return await ChallengeModel.findById(id);
  }
  async update(
    id: string,
    data: Partial<IChallenge>,
  ): Promise<IChallenge | null> {
    await ChallengeModel.updateOne({ _id: id }, data);
    return await this.readOne(id);
  }
  async del(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
