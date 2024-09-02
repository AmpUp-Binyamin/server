// src\services\DeckService.ts
import { FilterQuery, Types } from 'mongoose';
import DeckController from '../controllers/DeckController';
import { IDeck } from '../interfaces/IDeck';
import { Mapper } from '../helpers/Mapper';

// Define a type for filterable properties
type FilterableDeckProperties = {
  deckName?: string;
  description?: string;
  drawProbability?: number;
  winProbability?: number;
  coach?: Types.ObjectId | string;
  isActive?: boolean;
};

export default class DeckService {
  private deckController: DeckController;

  constructor() {
    this.deckController = new DeckController();
  }

  async createDeck(body: any, userId: string): Promise<IDeck> {
    const dto = {} as IDeck; // Create a blank DTO for mapping
    const deckData = Mapper<IDeck>(dto, { ...body, coach: userId, isActive: true }); // Map the incoming data to the DTO
    return await this.deckController.create(deckData);
  }

  async getDecks(filter: FilterableDeckProperties, userId: string): Promise<IDeck[]> {
    const queryFilter: FilterQuery<IDeck> = { 
      ...filter, 
      coach: userId,
      isActive: true
    }; // Cast Partial<IDeck> to FilterQuery<IDeck>
    return await this.deckController.read(queryFilter);
  }

  async getDeckById(id: string, userId: string): Promise<IDeck | null> {
    const deck = await this.deckController.readOne(id);
    if (deck && deck.coach.toString() === userId && deck.isActive) {
      return deck;
    }
    return null; // Return null if the coach ID does not match or deck is not active
  }

  async updateDeck(id: string, body: any, userId: string): Promise<IDeck | null> {
    const deck = await this.deckController.readOne(id);
    if (deck && deck.coach.toString() === userId && deck.isActive) {
      const dto = {} as IDeck; // Create a blank DTO for mapping
      const deckData = Mapper<IDeck>(dto, body); // Map the incoming data to the DTO
      return await this.deckController.update(id, deckData);
    }
    return null; // Return null if the coach ID does not match or deck is not active
  }

  async deleteDeck(id: string, userId: string): Promise<boolean> {
    const deck = await this.deckController.readOne(id);
    if (deck && deck.coach.toString() === userId && deck.isActive) {
      const updatedDeck = await this.deckController.update(id, { isActive: false });
      return !!updatedDeck; // Return true if update was successful, otherwise false
    }
    return false; // Return false if the coach ID does not match or deck is not active
  }
}
