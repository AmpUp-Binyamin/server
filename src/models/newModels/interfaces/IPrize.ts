import { Document, ObjectId } from 'mongoose';

export interface IPrize extends Document {
    name: string;
    description: string;
    image: string;
    price: number;
    daysToExpiry: number;
    daysToAvailability: number;
    quantity: number;
    cardType: string;
    isActive: boolean;
    isAction: boolean;
    coach: ObjectId;
}
