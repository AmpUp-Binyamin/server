// import { ObjectId } from 'mongoose';
import { FilterQuery } from 'mongoose';
import IController from '../interfaces/IController';
import ITeam from '../interfaces/ITeam';
import TeamModel from '../models/TeamModel'

export default class TeamController implements IController<ITeam> {
    async create(data: ITeam): Promise<ITeam> {
        return await TeamModel.create(data)
    }
    async read(filter: FilterQuery<ITeam>): Promise<ITeam[]> {
        return await TeamModel.find(filter)
    }
    async readOne(id: string): Promise<ITeam | null> {
        return await TeamModel.findById(id)
    }
    // todo: add select
    async readOneAndPopulate(id: string): Promise<ITeam | null> {
        return await TeamModel.findById(id).populate('members')//.select()
    }
    async update(id: string, data: Partial<ITeam>): Promise<ITeam | null> {
        await TeamModel.updateOne({_id:id},data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}


