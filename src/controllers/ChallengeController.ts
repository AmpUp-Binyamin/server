import { FilterQuery } from "mongoose";
import IChallenge from "../interfaces/IChallenge";
import IController from "../interfaces/IController";
import ChallengeModel from "../models/ChallengeModel";
import UserModel from "../models/UserModel";
import ICard from "../interfaces/ICard";

interface PopulateProps {
    member?: string
    coach?: string
}


export default class ChallengeController implements IController<IChallenge> {
    async create(data: IChallenge): Promise<IChallenge> {
        return await ChallengeModel.create(data)
    }

    async read(filter: FilterQuery<IChallenge>): Promise<IChallenge[]> {
        return await ChallengeModel.find(filter)
    }

    // לא בטוח שצריך את הפונ הזאת ככה
    async readOneWithPopulate(id: string, populate: PopulateProps, select: string): Promise<IChallenge | null> {
        const challenge = ChallengeModel.findById(id).select(select)
        if (populate.member) {
            challenge.populate({
                path: 'member',
                select: populate.member
            })
        }

        if (populate.coach) {
            challenge.populate({
                path: 'coach',
                select: populate.coach
            })
        }
        return await challenge.exec()
    }

    async readOne(id: string): Promise<IChallenge | null> {
        return await ChallengeModel.findById(id)
    }


    async update(id: string, data: Partial<IChallenge>): Promise<IChallenge | null> {
        await ChallengeModel.updateOne({ _id: id }, data)
        return await this.readOne(id)
    }
    async updateQuantity(challengeId: string, storeItemId: string, newQuantity: number): Promise<IChallenge | null> {
        let challenge = await ChallengeModel.findOneAndUpdate(
            { _id: challengeId, 'store._id': storeItemId },
            { $set: { 'store.$.quantity': newQuantity } },);
        return challenge
    }
    async del(id: string): Promise<boolean> {
        await ChallengeModel.deleteOne({ _id: id })
        return true
    }
}


















