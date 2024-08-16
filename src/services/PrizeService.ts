// src/services/PrizeService.ts
import PrizeController from '../controllers/PrizeController';
import IPrize from '../interfaces/IPrize';
import { Mapper } from '../helpers/Mapper';
import { FilterQuery } from 'mongoose';

export default class PrizeService {
  private prizeController: PrizeController;

  constructor() {
    this.prizeController = new PrizeController();
  }

  async createPrize(body: any): Promise<IPrize> {
    const dto = {} as IPrize; // Create a blank DTO for mapping
    const prizeData = Mapper<IPrize>(dto, body); // Map the incoming data to the DTO
    return await this.prizeController.create(prizeData);
  }

  async getPrizes(filter: Partial<IPrize>): Promise<IPrize[]> {
    const queryFilter: FilterQuery<IPrize> = filter as FilterQuery<IPrize>;
    return await this.prizeController.read(queryFilter);
  }

  async getPrizeById(id: string): Promise<IPrize | null> {
    return await this.prizeController.readOne(id);
  }

  async updatePrize(id: string, body: any): Promise<IPrize | null> {
    const dto = {} as IPrize; // Create a blank DTO for mapping
    const prizeData = Mapper<IPrize>(dto, body); // Map the incoming data to the DTO
    return await this.prizeController.update(id, prizeData);
  }

  async deletePrize(id: string): Promise<boolean> {
    return await this.prizeController.del(id);
  }
}
