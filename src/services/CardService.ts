// src\services\CardService.ts
import { FilterQuery, Types } from 'mongoose';
import CardController from '../controllers/CardController';
import ICard from '../interfaces/ICard';
import { Mapper } from '../helpers/Mapper';

// Define a type for filterable properties
type FilterableCardProperties = {
  cardType?: string;
  subType?: string;
  title?: string;
  content?: string;
  media?: Types.ObjectId[];
  coach?: Types.ObjectId | string;
  isActive?: boolean;
};
export default class CardService {
  private cardController: CardController;

  constructor() {
    this.cardController = new CardController();
  }

  async createCard(body: any, userId: string): Promise<ICard> {
    const dto = {} as ICard; // Create a blank DTO for mapping
    const cardData = Mapper<ICard>(dto, {
      ...body,
      coach: userId,
      isActive: true,
    }); // Map the incoming data to the DTO
    return await this.cardController.create(cardData);
  }

  async getCards(
    filter: FilterableCardProperties,
    userId: string,
  ): Promise<ICard[]> {
    const queryFilter: FilterQuery<ICard> = {
      ...filter,
      coach: userId,
      isActive: true,
    }; // Cast Partial<ICard> to FilterQuery<ICard>
    return await this.cardController.read(queryFilter);
  }

  async getCardById(id: string, userId: string): Promise<ICard | null> {
    const card = await this.cardController.readOne(id);
    if (card && card.coach.toString() === userId && card.isActive) {
      return card;
    }
    return null; // Return null if the coach ID does not match or card is not active
  }

  async updateCard(
    id: string,
    body: any,
    userId: string,
  ): Promise<ICard | null> {
    const card = await this.cardController.readOne(id);
    if (card && card.coach.toString() === userId && card.isActive) {
      const dto = {} as ICard; // Create a blank DTO for mapping
      const cardData = Mapper<ICard>(dto, body); // Map the incoming data to the DTO
      return await this.cardController.update(id, cardData);
    }
    return null; // Return null if the coach ID does not match or card is not active
  }

  async deleteCard(id: string, userId: string): Promise<boolean> {
    const card = await this.cardController.readOne(id);
    if (card && card.coach.toString() === userId && card.isActive) {
      const updatedCard = await this.cardController.update(id, {
        isActive: false,
      });
      return !!updatedCard; // Return true if update was successful, otherwise false
    }
    return false; // Return false if the coach ID does not match or card is not active
  }
}
