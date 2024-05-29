import { FilterQuery, ObjectId } from 'mongoose';
import IController from '../interfaces/IController';
import IMember from '../interfaces/IMember';
import MemberModel from '../models/MemberModel';

export default class MemberController implements IController<IMember> {
    async create(data: IMember): Promise<IMember> {
        return await MemberModel.create(data)
    }
    async read(filter: FilterQuery<IMember>): Promise<IMember[]> {
        return await MemberModel.find(filter)
    }
    async readOne(id: string |ObjectId): Promise<IMember | null> {
        return await MemberModel.findById(id)
    }
    async readWithChallenge(id: string): Promise<IMember | null> {
        return await MemberModel.findById(id).populate('myChallenge')
    }
    async update(id: string, data: Partial<IMember>): Promise<IMember | null> {
        await MemberModel.updateOne({_id:id},data)
        return await this.readOne(id)
    }
    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}