import activeChallengeController from "../controllers/ActiveChallengeController";
import ChallengeController from "../controllers/ChallengeController";
import MemberController from "../controllers/MemberControllers";
import IActiveChallenge from "../interfaces/IActiveChallenge";
import IChallenge from "../interfaces/IChallenge";
import IMember from "../interfaces/IMember";
import IStoreItem from "../interfaces/IStoreItem";
import { IMyCoins } from "../models/MemberModel";
import MemberService from "../services/MemberService";

export default class StoreService {
  static controller = new ChallengeController();

  static async getChallenge(_id: string): Promise<IStoreItem[]> {
    const challenge = await this.controller.readOne(_id);
    console.log(" s ", challenge);

    if (!challenge) {
      throw new Error("this challenge dose not exist ");
    }
    return challenge.store.filter((i) => {
      if (i.daysToExpiry > 0 && i.quantity > 0) {
        return i;
      }
    });
  }
  static async updateMemberItems(
    memberId: string,
    activeChallengeId: string,
    storeItemId: string
  ): Promise<IActiveChallenge | null> {

    const memberController = new MemberController();
    const activeChallController = new activeChallengeController();
    
    let m = await memberController.readOne(memberId);
    if (!m) return null;
    const member: IMember = m?.toObject?.() as IMember
    let memberCoinsObj: IMyCoins | undefined = member?.myCoins.find(obj => obj.activeChallengeId == activeChallengeId);
    let memberCoins: number | undefined = memberCoinsObj?.coins
    let activeChallenge: IActiveChallenge | null = await activeChallController.readOne(activeChallengeId);

    let price = activeChallenge?.store.find((c) => c._id == storeItemId)?.coins;
    let quantity = activeChallenge?.store.find((c) => c._id == storeItemId)?.quantity;

    if (memberCoins && price && activeChallenge) {
      if (memberCoins > price) {
        const coinsUpdate = member?.myCoins?.map?.(c => c.activeChallengeId === activeChallengeId ? { ...c, coins: c.coins - price } : c) || []
        let newStoreItem = await MemberService.addNewStoreItem(memberId, { cardId: storeItemId, activeChallengeId: activeChallengeId });
        let newCoineSum = await MemberService.updateMemberCoins(memberId, coinsUpdate);
        let newQuantity = await activeChallController.updateQuantity(activeChallengeId, storeItemId, quantity ? quantity - 1 : 0)
        return await activeChallController.readOne(activeChallengeId);
      }
    } return null
  }
}

//todo
//expiry day  -new data
