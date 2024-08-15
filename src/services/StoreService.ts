// src\services\StoreService.ts
import { FilterQuery } from 'mongoose';
import StoreController from '../controllers/StoreController';
import IStore from '../interfaces/IStore';
import { Mapper } from '../helpers/Mapper';

export default class StoreService {
    private storeController: StoreController;

    constructor() {
        this.storeController = new StoreController();
    }

    async createStore(body: any): Promise<IStore> {
        const dto = {} as IStore; // Create a blank DTO for mapping
        const storeData = Mapper<IStore>(dto, body); // Map the incoming data to the DTO
        return await this.storeController.create(storeData);
    }

    async getStores(filter: Partial<IStore>): Promise<IStore[]> {
        const queryFilter: FilterQuery<IStore> = filter as FilterQuery<IStore>; // Cast Partial<IStore> to FilterQuery<IStore>
        return await this.storeController.read(queryFilter);
    }

    async getStoreById(id: string): Promise<IStore | null> {
        return await this.storeController.readOne(id);
    }

    async updateStore(id: string, body: any): Promise<IStore | null> {
        const dto = {} as IStore; // Create a blank DTO for mapping
        const storeData = Mapper<IStore>(dto, body); // Map the incoming data to the DTO
        return await this.storeController.update(id, storeData);
    }

    async deleteStore(id: string): Promise<boolean> {
        const dto = {} as IStore; // Create a blank DTO for mapping
        const storeData = Mapper<IStore>(dto, { isActive: false }); // Set `isActive` to false
        const updatedStore = await this.storeController.update(id, storeData);
        return !!updatedStore; // Return true if update was successful, otherwise false
    }
}
