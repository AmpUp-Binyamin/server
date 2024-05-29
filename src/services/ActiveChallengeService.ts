import activeChallengeController from "../controllers/ActiveChallengeController"
import MemberController from "../controllers/MemberControllers"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import { RandomNumberGenerator } from "../helpers/luck"
import IActiveChallenge from "../interfaces/IActiveChallenge"

export default class ActiveChallegeService {
    static controller = new activeChallengeController()
    static RandomGenerator = new RandomNumberGenerator()
    static memberController = new MemberController()
    static async getSingleActiveChallenge(id: string): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id)
    }

    static async createNewActiveChallenge(data: any): Promise<IActiveChallenge> {
        if (!data.challenge) {
            throw { code: 400, msg: "challenge not found" }
        }
        if (!data.startDate) {
            throw { code: 400, msg: "start date not found" }
        }
        let newActiveChallenge: IActiveChallenge = {
            coach: data.userId,
            challenge: data.challenge,
            participants: [],
            startDate: data.startDate,
            cards: []
        }
        return await this.controller.create(newActiveChallenge)
    }

    static async handleCardAnswer(challengeId: string, cardId: string, answer: any) {//}: Promise<IActiveChallenge> {
        console.log({ challengeId, cardId, answer });
        if (!challengeId || !cardId) throw { code: 400, msg: "missing data" };

        // מציאת האתגר בדטאבייס
        //                    *******למחוק*******
        let activeChallenge = activeChallengeDemo || await this.getSingleActiveChallenge(challengeId);
        if (!activeChallenge) throw { code: 400, msg: "challenge not found" };

        // מציאת הכרטיס
        let card = activeChallenge.challenge.cards.find(card => card._id == cardId);
        if (!card) throw { code: 400, msg: "card not found" };

        // cardType: 'question' | 'challenge' | 'media' | 'study' | 'lottery' | 'love' | 'share';
        // subType?: 'multipleChoice' | 'url' | 'freeText' | 'upload' | 'multipleChoice+freeText';
        // קביעת התנהגות בהתאם לקלף
        switch (card.cardType) {
            case "question":
                break;
            case "challenge":
                break;
            case "media":
                break;
            case "study":
                break;
            case "lottery":
                break;
            case "love":
                break;
            case "share":
                break;
            default:
                break;

        }

    }

    static async loveCard(challengeId: string): Promise<any> {

        let challenge = await this.controller.readOne(challengeId, 'participants')
        if (!challenge) throw { code: 400, message: "go to hell!!!" };
        let num = challenge.participants.length
        let user = challenge.participants[this.RandomGenerator.getRandom(0, num - 1)];


        return await this.memberController.readOne(String(user))
    }
}


let challengeDemo = {
    "_id": {
        "$oid": "6656df1b8437151db0cce4ee"
    },
    "challengeName": "Fitness Challenge",
    "coverImage": "https://www.dietmaster.co.il/wp-content/uploads/2015/02/%D7%A9%D7%99%D7%98%D7%95%D7%AA-%D7%94%D7%A8%D7%96%D7%99%D7%94.jpg",
    "subDescription": "Get fit in 30 days",
    "duration": 30,
    "tags": [
        "fitness",
        "health",
        "wellness"
    ],
    "isPublic": true,
    "isTemplate": false,
    "creator": {
        "$oid": "6656df1b8437151db0cce4ea"
    },
    "store": [
        {
            "name": "Water Bottle",
            "description": "Stainless steel water bottle",
            "image": "https://www.ewines.co.il/wp-content/uploads/2022/08/3-%D7%9E%D7%99%D7%9D.jpg",
            "coins": 50,
            "daysToExpiry": 30,
            "quantity": 100,
            "_id": {
                "$oid": "6656df1b8437151db0cce4ef"
            }
        }
    ],
    "cards": [
        {
            "day": 1,
            "cardOrder": 1,
            "cardType": "question",
            "subType": "open",
            "title": "What is your favorite hobby?",
            "content": "Please describe your favorite hobby in detail.",
            "media": {
                "type": "image",
                "content": "hobby.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4f1"
                }
            },
            "coins": 10,
            "image": "hobby_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4f0"
        },
        {
            "day": 1,
            "cardOrder": 2,
            "cardType": "task",
            "subType": "daily",
            "title": "Morning Exercise",
            "content": "Do a 30-minute morning exercise routine.",
            "media": {
                "type": "video",
                "content": "exercise_routine.mp4",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4f3"
                }
            },
            "coins": 20,
            "image": "exercise_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4f2"
        },
        {
            "day": 1,
            "cardOrder": 3,
            "cardType": "question",
            "subType": "multiple_choice",
            "title": "Preferred Workout Time",
            "content": "What time of day do you prefer to work out?",
            "media": {
                "type": "text",
                "content": "Morning, Afternoon, Evening",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4f5"
                }
            },
            "coins": 15,
            "image": "workout_time.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4f4"
        },
        {
            "day": 1,
            "cardOrder": 4,
            "cardType": "challenge",
            "subType": "weekly",
            "title": "Run 5 Miles",
            "content": "Complete a 5-mile run by the end of the week.",
            "media": {
                "type": "audio",
                "content": "motivation_speech.mp3",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4f7"
                }
            },
            "coins": 30,
            "image": "run_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4f6"
        },
        {
            "day": 1,
            "cardOrder": 5,
            "cardType": "question",
            "subType": "open",
            "title": "Favorite Healthy Meal",
            "content": "Share your favorite healthy meal recipe.",
            "media": {
                "type": "image",
                "content": "healthy_meal.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4f9"
                }
            },
            "coins": 10,
            "image": "meal_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4f8"
        },
        {
            "day": 1,
            "cardOrder": 6,
            "cardType": "lottery",
            "subType": "draw",
            "title": "Lucky Draw",
            "content": "Try your luck! You might win extra coins.",
            "media": {
                "type": "image",
                "content": "lottery.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4fb"
                }
            },
            "coins": 50,
            "image": "lottery_image.jpg",
            "drawProbability": 0.1,
            "winProbability": 0.05,
            "_id": "6656df1b8437151db0cce4fa"
        },
        {
            "day": 2,
            "cardOrder": 1,
            "cardType": "question",
            "subType": "open",
            "title": "What is your favorite hobby?",
            "content": "Please describe your favorite hobby in detail.",
            "media": {
                "type": "image",
                "content": "hobby.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4fd"
                }
            },
            "coins": 10,
            "image": "hobby_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4fc"
        },
        {
            "day": 2,
            "cardOrder": 2,
            "cardType": "task",
            "subType": "daily",
            "title": "Morning Exercise",
            "content": "Do a 30-minute morning exercise routine.",
            "media": {
                "type": "video",
                "content": "exercise_routine.mp4",
                "_id": {
                    "$oid": "6656df1b8437151db0cce4ff"
                }
            },
            "coins": 20,
            "image": "exercise_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce4fe"
        },
        {
            "day": 2,
            "cardOrder": 3,
            "cardType": "question",
            "subType": "multiple_choice",
            "title": "Preferred Workout Time",
            "content": "What time of day do you prefer to work out?",
            "media": {
                "type": "text",
                "content": "Morning, Afternoon, Evening",
                "_id": {
                    "$oid": "6656df1b8437151db0cce501"
                }
            },
            "coins": 15,
            "image": "workout_time.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce500"
        },
        {
            "day": 2,
            "cardOrder": 4,
            "cardType": "challenge",
            "subType": "weekly",
            "title": "Run 5 Miles",
            "content": "Complete a 5-mile run by the end of the week.",
            "media": {
                "type": "audio",
                "content": "motivation_speech.mp3",
                "_id": {
                    "$oid": "6656df1b8437151db0cce503"
                }
            },
            "coins": 30,
            "image": "run_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce502"
        },
        {
            "day": 2,
            "cardOrder": 5,
            "cardType": "question",
            "subType": "open",
            "title": "Favorite Healthy Meal",
            "content": "Share your favorite healthy meal recipe.",
            "media": {
                "type": "image",
                "content": "healthy_meal.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce505"
                }
            },
            "coins": 10,
            "image": "meal_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce504"
        },
        {
            "day": 2,
            "cardOrder": 6,
            "cardType": "lottery",
            "subType": "draw",
            "title": "Lucky Draw",
            "content": "Try your luck! You might win extra coins.",
            "media": {
                "type": "image",
                "content": "lottery.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce507"
                }
            },
            "coins": 50,
            "image": "lottery_image.jpg",
            "drawProbability": 0.1,
            "winProbability": 0.05,
            "_id": "6656df1b8437151db0cce506"
        },
        {
            "day": 3,
            "cardOrder": 1,
            "cardType": "question",
            "subType": "open",
            "title": "What is your favorite hobby?",
            "content": "Please describe your favorite hobby in detail.",
            "media": {
                "type": "image",
                "content": "hobby.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce509"
                }
            },
            "coins": 10,
            "image": "hobby_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce508"
        },
        {
            "day": 3,
            "cardOrder": 2,
            "cardType": "task",
            "subType": "daily",
            "title": "Morning Exercise",
            "content": "Do a 30-minute morning exercise routine.",
            "media": {
                "type": "video",
                "content": "exercise_routine.mp4",
                "_id": {
                    "$oid": "6656df1b8437151db0cce50b"
                }
            },
            "coins": 20,
            "image": "exercise_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce50a"
        },
        {
            "day": 3,
            "cardOrder": 3,
            "cardType": "question",
            "subType": "multiple_choice",
            "title": "Preferred Workout Time",
            "content": "What time of day do you prefer to work out?",
            "media": {
                "type": "text",
                "content": "Morning, Afternoon, Evening",
                "_id": {
                    "$oid": "6656df1b8437151db0cce50d"
                }
            },
            "coins": 15,
            "image": "workout_time.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce50c"
        },
        {
            "day": 3,
            "cardOrder": 4,
            "cardType": "challenge",
            "subType": "weekly",
            "title": "Run 5 Miles",
            "content": "Complete a 5-mile run by the end of the week.",
            "media": {
                "type": "audio",
                "content": "motivation_speech.mp3",
                "_id": {
                    "$oid": "6656df1b8437151db0cce50f"
                }
            },
            "coins": 30,
            "image": "run_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce50e"
        },
        {
            "day": 3,
            "cardOrder": 5,
            "cardType": "question",
            "subType": "open",
            "title": "Favorite Healthy Meal",
            "content": "Share your favorite healthy meal recipe.",
            "media": {
                "type": "image",
                "content": "healthy_meal.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce511"
                }
            },
            "coins": 10,
            "image": "meal_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce510"
        },
        {
            "day": 3,
            "cardOrder": 6,
            "cardType": "lottery",
            "subType": "draw",
            "title": "Lucky Draw",
            "content": "Try your luck! You might win extra coins.",
            "media": {
                "type": "image",
                "content": "lottery.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce513"
                }
            },
            "coins": 50,
            "image": "lottery_image.jpg",
            "drawProbability": 0.1,
            "winProbability": 0.05,
            "_id": "6656df1b8437151db0cce512"
        },
        {
            "day": 4,
            "cardOrder": 1,
            "cardType": "question",
            "subType": "open",
            "title": "What is your favorite hobby?",
            "content": "Please describe your favorite hobby in detail.",
            "media": {
                "type": "image",
                "content": "hobby.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce515"
                }
            },
            "coins": 10,
            "image": "hobby_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce514"
        },
        {
            "day": 4,
            "cardOrder": 2,
            "cardType": "task",
            "subType": "daily",
            "title": "Morning Exercise",
            "content": "Do a 30-minute morning exercise routine.",
            "media": {
                "type": "video",
                "content": "exercise_routine.mp4",
                "_id": {
                    "$oid": "6656df1b8437151db0cce517"
                }
            },
            "coins": 20,
            "image": "exercise_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce516"
        },
        {
            "day": 4,
            "cardOrder": 3,
            "cardType": "question",
            "subType": "multiple_choice",
            "title": "Preferred Workout Time",
            "content": "What time of day do you prefer to work out?",
            "media": {
                "type": "text",
                "content": "Morning, Afternoon, Evening",
                "_id": {
                    "$oid": "6656df1b8437151db0cce519"
                }
            },
            "coins": 15,
            "image": "workout_time.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce518"
        },
        {
            "day": 4,
            "cardOrder": 4,
            "cardType": "challenge",
            "subType": "weekly",
            "title": "Run 5 Miles",
            "content": "Complete a 5-mile run by the end of the week.",
            "media": {
                "type": "audio",
                "content": "motivation_speech.mp3",
                "_id": {
                    "$oid": "6656df1b8437151db0cce51b"
                }
            },
            "coins": 30,
            "image": "run_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce51a"
        },
        {
            "day": 4,
            "cardOrder": 5,
            "cardType": "question",
            "subType": "open",
            "title": "Favorite Healthy Meal",
            "content": "Share your favorite healthy meal recipe.",
            "media": {
                "type": "image",
                "content": "healthy_meal.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce51d"
                }
            },
            "coins": 10,
            "image": "meal_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce51c"
        },
        {
            "day": 4,
            "cardOrder": 6,
            "cardType": "lottery",
            "subType": "draw",
            "title": "Lucky Draw",
            "content": "Try your luck! You might win extra coins.",
            "media": {
                "type": "image",
                "content": "lottery.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce51f"
                }
            },
            "coins": 50,
            "image": "lottery_image.jpg",
            "drawProbability": 0.1,
            "winProbability": 0.05,
            "_id": "6656df1b8437151db0cce51e"
        },
        {
            "day": 5,
            "cardOrder": 1,
            "cardType": "question",
            "subType": "open",
            "title": "What is your favorite hobby?",
            "content": "Please describe your favorite hobby in detail.",
            "media": {
                "type": "image",
                "content": "hobby.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce521"
                }
            },
            "coins": 10,
            "image": "hobby_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce520"
        },
        {
            "day": 5,
            "cardOrder": 2,
            "cardType": "task",
            "subType": "daily",
            "title": "Morning Exercise",
            "content": "Do a 30-minute morning exercise routine.",
            "media": {
                "type": "video",
                "content": "exercise_routine.mp4",
                "_id": {
                    "$oid": "6656df1b8437151db0cce523"
                }
            },
            "coins": 20,
            "image": "exercise_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce522"
        },
        {
            "day": 5,
            "cardOrder": 3,
            "cardType": "question",
            "subType": "multiple_choice",
            "title": "Preferred Workout Time",
            "content": "What time of day do you prefer to work out?",
            "media": {
                "type": "text",
                "content": "Morning, Afternoon, Evening",
                "_id": {
                    "$oid": "6656df1b8437151db0cce525"
                }
            },
            "coins": 15,
            "image": "workout_time.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce524"
        },
        {
            "day": 5,
            "cardOrder": 4,
            "cardType": "challenge",
            "subType": "weekly",
            "title": "Run 5 Miles",
            "content": "Complete a 5-mile run by the end of the week.",
            "media": {
                "type": "audio",
                "content": "motivation_speech.mp3",
                "_id": {
                    "$oid": "6656df1b8437151db0cce527"
                }
            },
            "coins": 30,
            "image": "run_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce526"
        },
        {
            "day": 5,
            "cardOrder": 5,
            "cardType": "question",
            "subType": "open",
            "title": "Favorite Healthy Meal",
            "content": "Share your favorite healthy meal recipe.",
            "media": {
                "type": "image",
                "content": "healthy_meal.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce529"
                }
            },
            "coins": 10,
            "image": "meal_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce528"
        },
        {
            "day": 5,
            "cardOrder": 6,
            "cardType": "lottery",
            "subType": "draw",
            "title": "Lucky Draw",
            "content": "Try your luck! You might win extra coins.",
            "media": {
                "type": "image",
                "content": "lottery.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce52b"
                }
            },
            "coins": 50,
            "image": "lottery_image.jpg",
            "drawProbability": 0.1,
            "winProbability": 0.05,
            "_id": "6656df1b8437151db0cce52a"
        },
        {
            "day": 6,
            "cardOrder": 1,
            "cardType": "question",
            "subType": "open",
            "title": "What is your favorite hobby?",
            "content": "Please describe your favorite hobby in detail.",
            "media": {
                "type": "image",
                "content": "hobby.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce52d"
                }
            },
            "coins": 10,
            "image": "hobby_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce52c"
        },
        {
            "day": 6,
            "cardOrder": 2,
            "cardType": "task",
            "subType": "daily",
            "title": "Morning Exercise",
            "content": "Do a 30-minute morning exercise routine.",
            "media": {
                "type": "video",
                "content": "exercise_routine.mp4",
                "_id": {
                    "$oid": "6656df1b8437151db0cce52f"
                }
            },
            "coins": 20,
            "image": "exercise_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce52e"
        },
        {
            "day": 6,
            "cardOrder": 3,
            "cardType": "question",
            "subType": "multiple_choice",
            "title": "Preferred Workout Time",
            "content": "What time of day do you prefer to work out?",
            "media": {
                "type": "text",
                "content": "Morning, Afternoon, Evening",
                "_id": {
                    "$oid": "6656df1b8437151db0cce531"
                }
            },
            "coins": 15,
            "image": "workout_time.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce530"
        },
        {
            "day": 6,
            "cardOrder": 4,
            "cardType": "challenge",
            "subType": "weekly",
            "title": "Run 5 Miles",
            "content": "Complete a 5-mile run by the end of the week.",
            "media": {
                "type": "audio",
                "content": "motivation_speech.mp3",
                "_id": {
                    "$oid": "6656df1b8437151db0cce533"
                }
            },
            "coins": 30,
            "image": "run_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce532"
        },
        {
            "day": 6,
            "cardOrder": 5,
            "cardType": "question",
            "subType": "open",
            "title": "Favorite Healthy Meal",
            "content": "Share your favorite healthy meal recipe.",
            "media": {
                "type": "image",
                "content": "healthy_meal.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce535"
                }
            },
            "coins": 10,
            "image": "meal_image.jpg",
            "drawProbability": 0,
            "winProbability": 0,
            "_id": "6656df1b8437151db0cce534"
        },
        {
            "day": 6,
            "cardOrder": 6,
            "cardType": "lottery",
            "subType": "draw",
            "title": "Lucky Draw",
            "content": "Try your luck! You might win extra coins.",
            "media": {
                "type": "image",
                "content": "lottery.jpg",
                "_id": {
                    "$oid": "6656df1b8437151db0cce537"
                }
            },
            "coins": 50,
            "image": "lottery_image.jpg",
            "drawProbability": 0.1,
            "winProbability": 0.05,
            "_id": "6656df1b8437151db0cce536"
        }
    ],
    "invited": [
        "yossi@example.com",
        "hana@example.com"
    ],
    "__v": 0
}

let activeChallengeDemo = {
    "_id": {
        "$oid": "6656df1b8437151db0cce584"
    },
    "coach": {
        "$oid": "6656df1b8437151db0cce4ea"
    },
    "challenge": challengeDemo,
    "participants": [
        {
            "_id": {
                "$oid": "6656df1b8437151db0cce4e4"
            }
        },
        {
            "_id": {
                "$oid": "6656df1b8437151db0cce4e6"
            }
        }
    ],
    "startDate": {
        "$date": "2024-05-29T07:54:03.650Z"
    },
    "cards": [
        {
            "member": {
                "$oid": "6656df1b8437151db0cce4e2"
            },
            "card": {
                "$oid": "6656df1b8437151db0cce4f0"
            },
            "challengeDay": 1,
            "coins": 10,
            "answerValue": "I like to eat healthy salads.",
            "answerMedia": [],
            "_id": {
                "$oid": "6656df1b8437151db0cce587"
            }
        },
        {
            "member": {
                "$oid": "6656df1b8437151db0cce4e4"
            },
            "card": {
                "$oid": "6656df1b8437151db0cce4f2"
            },
            "challengeDay": 1,
            "coins": 20,
            "answerValue": "My favorite food is pizza!",
            "answerMedia": [],
            "_id": {
                "$oid": "6656df1b8437151db0cce588"
            }
        }
    ],
    "__v": 0
}









