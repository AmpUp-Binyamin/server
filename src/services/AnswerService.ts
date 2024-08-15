// src\services\AnswerService.ts
import { FilterQuery } from 'mongoose';
import AnswerController from '../controllers/AnswerController';
import IAnswer from '../interfaces/IAnswer';
import { Mapper } from '../helpers/Mapper';

export default class AnswerService {
    private answerController: AnswerController;

    constructor() {
        this.answerController = new AnswerController();
    }

    async createAnswer(body: any): Promise<IAnswer> {
        const dto = {} as IAnswer; // Create a blank DTO for mapping
        const answerData = Mapper<IAnswer>(dto, body); // Map the incoming data to the DTO
        return await this.answerController.create(answerData);
    }

    async getAnswers(filter: Partial<IAnswer>): Promise<IAnswer[]> {
        const queryFilter: FilterQuery<IAnswer> = filter as FilterQuery<IAnswer>; // Cast Partial<IAnswer> to FilterQuery<IAnswer>
        return await this.answerController.read(queryFilter);
    }

    async getAnswerById(id: string): Promise<IAnswer | null> {
        return await this.answerController.readOne(id);
    }

    async updateAnswer(id: string, body: any): Promise<IAnswer | null> {
        const dto = {} as IAnswer; // Create a blank DTO for mapping
        const answerData = Mapper<IAnswer>(dto, body); // Map the incoming data to the DTO
        return await this.answerController.update(id, answerData);
    }

    async deleteAnswer(id: string): Promise<boolean> {
        // Instead of deleting, we'll update `isActive` to `false`
        const dto = {} as IAnswer; // Create a blank DTO for mapping
        const answerData = Mapper<IAnswer>(dto, { isActive: false }); // Set `isActive` to false
        const updatedAnswer = await this.answerController.update(id, answerData);
        return !!updatedAnswer; // Return true if update was successful, otherwise false
    }
}
