// src/services/PrizeService.ts
import PrizeController from '../controllers/PrizeController';
import IPrize from '../interfaces/IPrize';
import { Mapper } from '../helpers/Mapper';
import { FilterQuery, Types } from 'mongoose';

type FilterablePrizeProperties = {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  daysToExpiry?: number;
  coach?: Types.ObjectId | string;
  isActive?: boolean;
};
export default class PrizeService {
  private prizeController: PrizeController;

  constructor() {
    this.prizeController = new PrizeController();
  }

  async createPrize(body: any, userId: string): Promise<IPrize> {
    const dto = {} as IPrize; // Create a blank DTO for mapping
    const prizeData = Mapper<IPrize>(dto, { ...body, coach: userId, isActive: true }); // Map the incoming data to the DTO
    return await this.prizeController.create(prizeData);
  }

  async getPrizes(filter: FilterablePrizeProperties, userId: string): Promise<IPrize[]> {
    const queryFilter: FilterQuery<IPrize> = { 
      ...filter, 
      coach: userId,
      isActive: true
    };
    return await this.prizeController.read(queryFilter);
  }

  async getPrizeById(id: string, userId: string): Promise<IPrize | null> {
    const prize = await this.prizeController.readOne(id);
    if (prize && prize.coach.toString() === userId && prize.isActive) {
      return prize;
    }
    return null; // Return null if the coach ID does not match or prize is not active
  }

  async updatePrize(id: string, body: any, userId: string): Promise<IPrize | null> {
    const prize = await this.prizeController.readOne(id);
    if (prize && prize.coach.toString() === userId && prize.isActive) {
      const dto = {} as IPrize; // Create a blank DTO for mapping
      const prizeData = Mapper<IPrize>(dto, body); // Map the incoming data to the DTO
      return await this.prizeController.update(id, prizeData);
    }
    return null; // Return null if the coach ID does not match or prize is not active
  }

  async deletePrize(id: string, userId: string): Promise<boolean> {
    const prize = await this.prizeController.readOne(id);
    if (prize && prize.coach.toString() === userId && prize.isActive) {
      const updatedPrize = await this.prizeController.update(id, { isActive: false });
      return !!updatedPrize; // Return true if update was successful, otherwise false
    }
    return false; // Return false if the coach ID does not match or prize is not active
  }
}
