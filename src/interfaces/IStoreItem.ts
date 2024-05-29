export default interface IStoreItem {
    _id?:string; 
    name: string;
    description: string;
    image: string;
    coins: number;
    daysToExpiry: number;
    expiryDay : Date ;
    quantity: number;
}