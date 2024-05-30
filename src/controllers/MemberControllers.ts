import { FilterQuery } from "mongoose";
import IActiveChallenge from '../interfaces/IActiveChallenge';
import IController from "../interfaces/IController";
import IMember from "../interfaces/IMember";
import INotifications from "../interfaces/INotifications";
import ActiveChallengeModel from '../models/ActiveChallengeModel';
import { default as MemberModel, default as NotificationModel } from "../models/MemberModel";

export default class MemberController implements IController<IMember> {
    async create(data: IMember): Promise<IMember> {
        return await MemberModel.create(data)
    }
    async read(filter: FilterQuery<IMember>): Promise<IMember[]> {
        return await MemberModel.find(filter)
    }
    async readOne(id: string): Promise<IMember | null> {
        return await MemberModel.findById(id)
    }
    async readWithChallenge(id: string): Promise<IMember | null> {
        return await MemberModel.findById(id)
            .populate({
                path: 'myChallenge',
                select: 'challengeName creator duration cards.title cards.day cards.image cards.cardType  cards._id',
                populate: [{ path: 'creator', select: 'fullName picture' }]
            }).lean()
    }
    async readStartDate(id: string): Promise<IActiveChallenge | null> {
        const activeChallenge = await ActiveChallengeModel.findOne({ challenge: id }, 'startDate cards');
        if (!activeChallenge) {
            throw new Error('Active challenge not found');
        }
        return activeChallenge;
    }

    async del(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async readOneProj(id: string, projection: string): Promise<IMember | null> {
        return await MemberModel.findById(id, projection);
    }
    async readNotifications(
        memberId: string,
        challengeId: string
    ): Promise<INotifications[] | null> {
        try {
            let member = await MemberModel.findById(memberId).populate(
                "notifications.sender"
            );
            if (!member) {
                console.error(`Member with ID ${memberId} not found`);
                return null;
            }
            let notifi = member?.notifications.filter(
                (notification) => notification.challenge == challengeId
            );
            return notifi;
        } catch (error) {
            console.error(
                `Error fetching notifications for memberId: ${memberId} and challengeId: ${challengeId}`,
                error
            );
            return null;
        }
    }
    async deleteNotification(
        memberId: string,
        notificationId: string
    ): Promise<INotifications[] | null> {
        return await NotificationModel.findByIdAndUpdate(memberId, {
            $pull: { notifications: { _id: notificationId } },
        });
    }
    async update(id: string, data: Partial<IMember>): Promise<IMember | null> {
        await MemberModel.updateOne({ _id: id }, data);
        return await this.readOne(id);
    }


    async updateStoreItem(id: string, data: string): Promise<IMember | null> {
        return await MemberModel.findByIdAndUpdate(id, { $push: { myItems: data } });
    }
    async updateCoins(id: string, data: number): Promise<IMember | null> {
        return await MemberModel.findByIdAndUpdate(id, { coins: data });
    }


    async save(data: IMember | null): Promise<void> {
        // @ts-ignore
        // TODO - fix that!!!
        await (data as Document)?.save();
    }

}


