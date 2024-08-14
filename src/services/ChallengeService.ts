// src/services/ChallengeService.ts
import { FilterQuery } from 'mongoose';
import ChallengeController from '../controllers/ChallengeController';
import IChallenge from '../interfaces/IChallenge';
import { Mapper } from '../helpers/Mapper';

export default class ChallengeService {
    private challengeController: ChallengeController;

    constructor() {
        this.challengeController = new ChallengeController();
    }

    async createChallenge(body: any): Promise<IChallenge> {
        const dto = {} as IChallenge; // Create a blank DTO for mapping
        const challengeData = Mapper<IChallenge>(dto, body); // Map the incoming data to the DTO
        return await this.challengeController.create(challengeData);
    }

    async getChallenges(filter: Partial<IChallenge>): Promise<IChallenge[]> {
        const queryFilter: FilterQuery<IChallenge> = filter as FilterQuery<IChallenge>; // Cast Partial<IChallenge> to FilterQuery<IChallenge>
        return await this.challengeController.read(queryFilter);
    }

    async getChallengeById(id: string): Promise<IChallenge | null> {
        return await this.challengeController.readOne(id);
    }

    async updateChallenge(id: string, body: any): Promise<IChallenge | null> {
        const dto = {} as IChallenge; // Create a blank DTO for mapping
        const challengeData = Mapper<IChallenge>(dto, body); // Map the incoming data to the DTO
        return await this.challengeController.update(id, challengeData);
    }

    async deleteChallenge(id: string): Promise<boolean> {
        const dto = {} as IChallenge; // Create a blank DTO for mapping
        const challengeData = Mapper<IChallenge>(dto, { isActive: false }); // Set `isActive` to false
        const updatedChallenge = await this.challengeController.update(id, challengeData);
        return !!updatedChallenge; // Return true if update was successful, otherwise false
    }
}
