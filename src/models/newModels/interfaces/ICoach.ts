import { Document, ObjectId } from 'mongoose';

export interface ICoach extends Document {
    fullName: string;
    title: string;
    email: string;
    phoneNumber: string;
    image?: string;
    link?: string;
    joinDate: Date;
    // paymentDetails?: string;
    // billingHistory?: string[];
}
