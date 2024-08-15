// src\services\DeckService.ts
import { FilterQuery } from 'mongoose';
import DeckController from '../controllers/DeckController';
import {IDeck} from '../interfaces/IDeck';
import { Mapper } from '../helpers/Mapper';

export default class DeckService {
    private deckController: DeckController;

    constructor() {
        this.deckController = new DeckController();
    }

    async createDeck(body: any): Promise<IDeck> {
        const dto = {} as IDeck; // Create a blank DTO for mapping
        const deckData = Mapper<IDeck>(dto, body); // Map the incoming data to the DTO
        return await this.deckController.create(deckData);
    }

    async getDecks(filter: Partial<IDeck>): Promise<IDeck[]> {
        const queryFilter: FilterQuery<IDeck> = filter as FilterQuery<IDeck>; // Cast Partial<IDeck> to FilterQuery<IDeck>
        return await this.deckController.read(queryFilter);
    }

    async getDeckById(id: string): Promise<IDeck | null> {
        return await this.deckController.readOne(id);
    }

    async updateDeck(id: string, body: any): Promise<IDeck | null> {
        const dto = {} as IDeck; // Create a blank DTO for mapping
        const deckData = Mapper<IDeck>(dto, body); // Map the incoming data to the DTO
        return await this.deckController.update(id, deckData);
    }

    async deleteDeck(id: string): Promise<boolean> {
        const dto = {} as IDeck; // Create a blank DTO for mapping
        const deckData = Mapper<IDeck>(dto, { isActive: false }); // Set `isActive` to false
        const updatedDeck = await this.deckController.update(id, deckData);
        return !!updatedDeck; // Return true if update was successful, otherwise false
    }
}
