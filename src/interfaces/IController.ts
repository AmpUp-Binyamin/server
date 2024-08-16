// src\interfaces\IController.ts
import { FilterQuery } from 'mongoose';

export default interface IController<T> {
  create(data: T): Promise<T>;
  read(filter: FilterQuery<T>): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  del(id: string): Promise<boolean>;
}
