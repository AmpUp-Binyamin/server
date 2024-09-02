// src/services/ChallengeService.ts
import { FilterQuery } from 'mongoose';
import ChallengeController from '../controllers/ChallengeController';
import IChallenge from '../interfaces/IChallenge';
import { Mapper } from '../helpers/Mapper';

// Define a type for filterable properties
type FilterableChallengeProperties = {
  title?: string;
  description?: string;
  coach?: string;
  isActive?: boolean;
};

export default class ChallengeService {
  private challengeController: ChallengeController;

  constructor() {
    this.challengeController = new ChallengeController();
  }

  async createChallenge(body: any, userId: string): Promise<IChallenge> {
    const dto = {} as IChallenge; // Create a blank DTO for mapping
    const challengeData = Mapper<IChallenge>(dto, { ...body, coach: userId, isActive: true }); // Map the incoming data to the DTO
    return await this.challengeController.create(challengeData);
  }

  async getChallenges(filter: FilterableChallengeProperties, userId: string): Promise<IChallenge[]> {
    const queryFilter: FilterQuery<IChallenge> = { 
      ...filter, 
      coach: userId,
      isActive: true
    }; // Cast Partial<IChallenge> to FilterQuery<IChallenge>
    return await this.challengeController.read(queryFilter);
  }

  async getChallengeById(id: string, userId: string): Promise<IChallenge | null> {
    const challenge = await this.challengeController.readOne(id);
    if (challenge && challenge.coach.toString() === userId && challenge.isActive) {
      return challenge;
    }
    return null; // Return null if the coach ID does not match or challenge is not active
  }

  async updateChallenge(id: string, body: any, userId: string): Promise<IChallenge | null> {
    const challenge = await this.challengeController.readOne(id);
    if (challenge && challenge.coach.toString() === userId && challenge.isActive) {
      const dto = {} as IChallenge; // Create a blank DTO for mapping
      const challengeData = Mapper<IChallenge>(dto, body); // Map the incoming data to the DTO
      return await this.challengeController.update(id, challengeData);
    }
    return null; // Return null if the coach ID does not match or challenge is not active
  }

  async deleteChallenge(id: string, userId: string): Promise<boolean> {
    const challenge = await this.challengeController.readOne(id);
    if (challenge && challenge.coach.toString() === userId && challenge.isActive) {
      const updatedChallenge = await this.challengeController.update(id, { isActive: false });
      return !!updatedChallenge; // Return true if update was successful, otherwise false
    }
    return false; // Return false if the coach ID does not match or challenge is not active
  }
}
