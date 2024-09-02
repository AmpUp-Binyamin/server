// src\services\StoreService.ts
import { FilterQuery, Types } from 'mongoose';
import StoreController from '../controllers/StoreController';
import IStore from '../interfaces/IStore';
import { Mapper } from '../helpers/Mapper';

// Define a type for filterable properties
type FilterableStoreProperties = {
  storeName?: string;
  prizes?: Types.ObjectId[];
  coach?: Types.ObjectId | string;
  isActive?: boolean;
};

export default class StoreService {
  private storeController: StoreController;

  constructor() {
    this.storeController = new StoreController();
  }

  async createStore(body: any, userId: string): Promise<IStore> {
    const dto = {} as IStore;
    const storeData = Mapper<IStore>(dto, { ...body, coach: userId, isActive: true });
    return await this.storeController.create(storeData);
  }

  async getStores(filter: FilterableStoreProperties, userId: string): Promise<IStore[]> {
    const queryFilter: FilterQuery<IStore> = { 
      ...filter, 
      coach: userId,
      isActive: true
    };
    return await this.storeController.read(queryFilter);
  }

  async getStoreById(id: string, userId: string): Promise<IStore | null> {
    const store = await this.storeController.readOne(id);
    if (store && store.coach.toString() === userId && store.isActive) {
      return store;
    }
    return null;
  }

  async updateStore(id: string, body: any, userId: string): Promise<IStore | null> {
    const store = await this.storeController.readOne(id);
    if (store && store.coach.toString() === userId && store.isActive) {
      const dto = {} as IStore;
      const storeData = Mapper<IStore>(dto, body);
      return await this.storeController.update(id, storeData);
    }
    return null;
  }

  async deleteStore(id: string, userId: string): Promise<boolean> {
    const store = await this.storeController.readOne(id);
    if (store && store.coach.toString() === userId && store.isActive) {
      const updatedStore = await this.storeController.update(id, { isActive: false });
      return !!updatedStore;
    }
    return false;
  }
}
