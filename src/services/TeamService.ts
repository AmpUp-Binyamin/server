// src/services/TeamService.ts
import { FilterQuery, Types } from 'mongoose'; // Add Types import
import TeamController from '../controllers/TeamController';
import ITeam from '../interfaces/ITeam';
import { Mapper } from '../helpers/Mapper';

type FilterableTeamProperties = {
  teamName?: string;
  members?: Types.ObjectId[];
  coach?: Types.ObjectId | string;
  isActive?: boolean;
};

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

  async getTeams(
    filter: FilterableTeamProperties,
    userId: string,
  ): Promise<ITeam[]> {
    const queryFilter: FilterQuery<ITeam> = {
      ...filter,
      coaches: new Types.ObjectId(userId), // Filter by userId in coaches
      isActive: true, // Filter by isActive
    };
    return await this.teamController.read(queryFilter);
  }

  async getTeamById(id: string, userId: string): Promise<ITeam | null> {
    const team = await this.teamController.readOne(id);
    if (!team || team.coach.toString() === userId || !team.isActive) {
      throw { code: 404, message: 'Team not found or not active' };
    }
    return team;
  }

  async updateTeam(
    id: string,
    body: any,
    userId: string,
  ): Promise<ITeam | null> {
    const team = await this.teamController.readOne(id);
    if (team && team.coach.toString() === userId && team.isActive) {
      const dto = {} as ITeam; // Create a blank DTO for mapping
      const teamData = Mapper<ITeam>(dto, body); // Map the incoming data to the DTO
      return await this.teamController.update(id, teamData);
    }
    return null;
  }

  async deleteTeam(id: string, userId: string): Promise<boolean> {
    const team = await this.teamController.readOne(id);
    if (team && team.coach.toString() === userId && team.isActive) {
      const updatedTeam = await this.teamController.update(id, { isActive: false });
      return !!updatedTeam; // Return true if update was successful, otherwise false
    }
    return false;
  }
}
