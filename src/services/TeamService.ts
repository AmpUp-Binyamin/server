// src/services/TeamService.ts
import { FilterQuery } from 'mongoose';
import TeamController from '../controllers/TeamController';
import ITeam from '../interfaces/ITeam';
import { Mapper } from '../helpers/Mapper';

export default class TeamService {
    private teamController: TeamController;

    constructor() {
        this.teamController = new TeamController();
    }

    async createTeam(body: any): Promise<ITeam> {
        const dto = {} as ITeam; // Create a blank DTO for mapping
        const teamData = Mapper<ITeam>(dto, body); // Map the incoming data to the DTO
        return await this.teamController.create(teamData);
    }

    async getTeams(filter: Partial<ITeam>): Promise<ITeam[]> {
        const queryFilter: FilterQuery<ITeam> = filter as FilterQuery<ITeam>; // Cast Partial<ITeam> to FilterQuery<ITeam>
        return await this.teamController.read(queryFilter);
    }

    async getTeamById(id: string): Promise<ITeam | null> {
        return await this.teamController.readOne(id);
    }

    async updateTeam(id: string, body: any): Promise<ITeam | null> {
        const dto = {} as ITeam; // Create a blank DTO for mapping
        const teamData = Mapper<ITeam>(dto, body); // Map the incoming data to the DTO
        return await this.teamController.update(id, teamData);
    }

    async deleteTeam(id: string): Promise<boolean> {
        const dto = {} as ITeam; // Create a blank DTO for mapping
        const teamData = Mapper<ITeam>(dto, { isActive: false }); // Set `isActive` to false
        const updatedTeam = await this.teamController.update(id, teamData);
        return !!updatedTeam; // Return true if update was successful, otherwise false
    }
}
