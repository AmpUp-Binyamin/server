import ActiveChallengeModel from '../models/ActiveChallengeModel';
import AdvanceSearchMongoose from "../helpers/AdvancedSearchMongoose";
import MemberModel from '../models/MemberModel';

export default function Tehill() {
    console.log("inTehill");
    

    const searchParams = {
        filter: {
            isActive: true
        },
        searchBy: 'g',
        searchIn: ["title", "description"],
        page: 1, //לחשב את הדף וכמה בדף
        numInPage: 10,
        sortBy: 'title',
        SortOrder: 'desc', // | 'asc' | 'desc
        populate: ['cards.card', 'description'],
        select: ['cards', 'user' ,'imaShlo']
    }
    const advance = new AdvanceSearchMongoose(MemberModel);

    // Define a query, populate, and other parameters as needed
    const query = {}; // Your query here
    const populate = ['myChallenge']; // Your populate field here
    // const select = ['myChallenge']; // Your select field here
const sortBy = 'fullName'
const page =2
const numInPage = 3
const sortOrder = 'desc'
  const select = ['myChallenge', 'fullName', 'email']; 
 return   advance.filterDocuments(query, populate,select , numInPage ,page, sortBy,sortOrder )
//  .then(result => {
//         console.log(JSON.stringify(result));
//       return  result
//     }).catch(error => {
//         console.error(error);
//     });
}


const searchParams = {
    filter: {
        isActive: true
    },
    searchBy: 'g',
    searchIn: ["title", "description"],
    page: 1, //לחשב את הדף וכמה בדף
    numInPage: 10,
    sortBy: 'title',
    SortOrder: 'desc', // | 'asc' | 'desc
    populate: ['title', 'description'],
    select: ['cards', 'user' ,'imaShlo']
}
