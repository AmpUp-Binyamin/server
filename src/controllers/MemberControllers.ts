import { FilterQuery, isValidObjectId } from "mongoose";
import IController from "../interfaces/IController";
import IMember from "../interfaces/IMember";
import MemberModel from "../models/MemberModel";
import INotifications from "../interfaces/INotifications";

export default class MemberController implements IController<IMember> {
  async create(data: IMember): Promise<IMember> {
    return await MemberModel.create(data);
  }
  async read(filter: FilterQuery<IMember>): Promise<IMember[]> {
    return await MemberModel.find(filter);
  }
  async readOne(id: string): Promise<IMember | null> {
    return await MemberModel.findById(id);
  }
  async readWithChallenge(id: string): Promise<IMember | null> {
    return await MemberModel.findById(id).populate("myChallenge");
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
  async update(id: string, data: Partial<IMember>): Promise<IMember | null> {
    await MemberModel.updateOne({ _id: id }, data);
    return await this.readOne(id);
  }
  async del(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
