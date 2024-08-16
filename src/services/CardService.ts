// src\services\CardService.ts
import { FilterQuery } from 'mongoose';
import CardController from '../controllers/CardController';
import ICard from '../interfaces/ICard';
import { Mapper } from '../helpers/Mapper';

export default class CardService {
  private cardController: CardController;

  constructor() {
    this.cardController = new CardController();
  }

  async createCard(body: any): Promise<ICard> {
    const dto = {} as ICard; // Create a blank DTO for mapping
    const cardData = Mapper<ICard>(dto, body); // Map the incoming data to the DTO
    return await this.cardController.create(cardData);
  }

  async getCards(filter: Partial<ICard>): Promise<ICard[]> {
    const queryFilter: FilterQuery<ICard> = filter as FilterQuery<ICard>; // Cast Partial<ICard> to FilterQuery<ICard>
    return await this.cardController.read(queryFilter);
  }

  async getCardById(id: string): Promise<ICard | null> {
    return await this.cardController.readOne(id);
  }

  async updateCard(id: string, body: any): Promise<ICard | null> {
    const dto = {} as ICard; // Create a blank DTO for mapping
    const cardData = Mapper<ICard>(dto, body); // Map the incoming data to the DTO
    return await this.cardController.update(id, cardData);
  }

  async deleteCard(id: string): Promise<boolean> {
    const dto = {} as ICard; // Create a blank DTO for mapping
    const cardData = Mapper<ICard>(dto, { isActive: false }); // Set `isActive` to false
    const updatedCard = await this.cardController.update(id, cardData);
    return !!updatedCard; // Return true if update was successful, otherwise false
  }
}
