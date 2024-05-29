export default interface IStoreItem {
    _id?:string; 
    name: string;
    description: string;
    image: string;
    coins: number;
    daysToExpiry: number;
    quantity: number;
    isActive: boolean;
    
}