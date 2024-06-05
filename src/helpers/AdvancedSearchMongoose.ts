
import ActiveChallengeModel from '../models/ActiveChallengeModel'
import { Document, FilterQuery, Model } from "mongoose";
import ChallengeModel from '../models/ChallengeModel';
import CoachModel from '../models/CoachModel';
import FeedBackModel from '../models/FeedBackModel';
import MediaModel from '../models/MediaModel';
import MemberModel from '../models/MemberModel';
import TeamModel from '../models/TeamModel';
import UserModel from '../models/UserModel';
import { populate } from 'dotenv';


export default class AdvanceSearchMongoose<T> {
    private model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }

    async filterDocuments(query: FilterQuery<T>, populate: string[]): Promise<T[]>
    async filterDocuments(query: FilterQuery<T>, populate: string[], select: string[], page?: number, numInPage?: number): Promise<T[]>
    async filterDocuments(
        query: FilterQuery<T>,
        populate?: string[],
        select?: string[],
        page?: number,
        numInPage?: number,
        // pagination?: number[],
        sortBy?: string,
        sortOrder?: 1 | "asc" | "desc" | -1,
        searchBy?: string, searchIn?: Array<keyof T>
    ): Promise<T[]>

    async filterDocuments(
        query: FilterQuery<T>,
        populate?: string[],
        select?: string[],
        page?: number,
        numInPage?: number,
        // pagination?: number[],
        sortBy?: string,
        sortOrder?: 1 | "asc" | "desc" | -1,
        searchBy?: string, searchIn?: Array<keyof T>
    ): Promise<T[]> {


        let res = this.model.find(query)
        //  res = res.find(query)
        if (populate) {
            populate.forEach(p => {
                res = res.populate(p);
            });
        }
        if (select) res = res.select(select.join(' '))
        if (searchBy) {
            let regex = new RegExp(searchBy, 'i')
            if (searchIn && searchIn.length > 0) {
                for (let i = 0; i < searchIn.length; i++) {
                    const orConditions = searchIn.map(field => ({ [field]: { $regex: regex } }));
                    query = {
                        ...query,
                        $or: [
                            { title: { $regex: regex } },
                            { description: { $regex: regex } }
                        ]
                    } as FilterQuery<T>;
                }
            }
            res = res.find(query)
        }

        if (page && numInPage) {
            // const skip = (page > 1 ? page - 1 : 1) * numInPage;
            const skip = (page) * numInPage

            let num = skip === numInPage ? page : skip
            res = res.skip(skip - numInPage).limit(skip)
        }
        if (sortBy && sortOrder) {
            res = res.sort({ [sortBy]: sortOrder });
        }

        // TODO - return number of results length 
        // {result: [], resultLength : 90}
        return res.exec();
    }





    

    // async searchRegx(query: FilterQuery<T>, searchBy?: string, searchIn?: Array<keyof T>): Promise<T[] | undefined> {
    //     if (searchBy) {
    //         let regex = new RegExp(searchBy, 'i')
    //         if (searchIn && searchIn.length > 0) {
    //             for (let i = 0; i < searchIn.length; i++) {
    //                 const orConditions = searchIn.map(field => ({ [field]: { $regex: regex } }));
    //                 query = {
    //                     ...query,
    //                     $or: [
    //                         { title: { $regex: regex } },
    //                         { description: { $regex: regex } }
    //                     ]
    //                 } as FilterQuery<T>;
    //             }
    //         }
    //         return this.model.find(query).exec(); //res=res.find if searchby
    //     }

    // }

}

// const searchParams = {
//     filter: {
//         isActive: true
//     },
//     searchBy: 'g',
//     searchIn: ["title", "description"],
//     page: 1, //לחשב את הדף וכמה בדף
//     numInPage: 10,
//     sortBy: 'title',
//     SortOrder: 'desc', // | 'asc' | 'desc
//     populate: ['title', 'description'],
//     select: ['cards', 'user' ,'imaShlo']
// }





//     return await this.model.find(filtertomongoose).populate?(populate).
//    }
//  let filtertomongoose :  FilterQuery<T>  ={ filter  :filter, paginution? :select}
//    let  populate : string = populate | undefined
// async search(model :,search :string[] , filter :<FilterQuery> , paginution : number, sort  :  , select : string, populate : string):Promise{
//     // const regex = new RegExp(search.join('|'), 'i')
//     // const query = ActiveChallengeSchema.find(filter).select(select).populate(populate).sort(sort).skip(paginution).limit(10)
//     // return await query.exec()