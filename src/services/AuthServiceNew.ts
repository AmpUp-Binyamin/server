// src\services\AuthServiceNew.ts
import UserController from "../controllers/UserController";
// import activeChallengeController from "../controllers/ActiveChallengeController";
import { ObjectId, Schema } from "mongoose";
import { createToken } from "../middleware/auth";
import { Code } from "mongodb";
import { IUser } from "../interfaces/IUser";
import ChallengeController from "../controllers/ChallengeController";
// import IActiveChallenge from "../interfaces/IActiveChallenge";

export default class AuthService {
  static UserController = new UserController();
  static ChallengeController = new ChallengeController();

  static async checkEmail(body: {
    email: string;
    name: string;
    image: string;
  }) {
    let fullName = body.name;
    let image = body.image;
    let email = body.email;
    //בודק אם האימייל נמצא ביוזר
    let user = (await this.UserController.read({ email }))[0];

    //אם מצא בודק אם יש צורך לעדכן את התמונה והשם ופועל בהתאם
    if (user) {
      if (!user.fullName) {
        await this.UserController.update(user.id, { fullName });
      }
      if (!user.image) {
        await this.UserController.update(user.id, { image });
      }
    }

    // //בודק אם האימייל נמצא מוזמן באתגר פעיל כלשהו
    // //אם נמצא מוזמן ולא קיים בממבר אז יוצר ממבר
    // let invited = await AuthService.findInvitedActivChaleng(email);
    // if (invited.length > 0) {
    //   if (!user) {
    //     await this.UserController.create({
    //       email,
    //       fullName,
    //       image,
    //       challenges: [],
    //       status: "User",
    //       coaches: [],
    //       isActive: false,
    //     });
    //   }
    // }

    //    // לבסוף שולח את הממבר המעודכן וזורק שגיאה ספציפית למקרה שלא נמצא ממבר
    //     user = (await this.UserController.read({ email }))[0];
    //     if (user == undefined) {
    //       throw { status: 407, msg: "user not exist" };
    //     }

    //     return user;
    //   }

    //   static activeChallengeController = new activeChallengeController();
    //   static async checkActivChaleng(challenge: ObjectId) {
    //     return await this.activeChallengeController.read({ challenge });
    //   }
    //   static async findInvitedActivChaleng(email: string) {
    //     return await this.activeChallengeController.read({ invited: email });
    //   }
    //   static async getMyInvitesAndMyActiveChallenge(email: string) {
    //     let user = (await this.UserController.read({ email }))[0];
    //     let myActivChallenge = user.myActiveChallenge as unknown as ObjectId[];
    //     let myChallenge = user.myChallenge;
    //     let myInvites = user.myInvites;
    //     let invitedInActivChallenge = await AuthService.findInvitedActivChaleng(
    //       email
    //     );
    //     if (invitedInActivChallenge.length > 0) {
    //       invitedInActivChallenge.forEach((i) => {
    //         if (
    //           !myInvites.find((a) => a == i.id) &&
    //           !myActivChallenge.find((a) => a == i.id) &&
    //           !myChallenge.find((a) => a == i.id)
    //         ) {
    //           myInvites.push(i.id);
    //         }
    //       });
    //     }

    //     await this.UserController.update(user.id, { myInvites });
    //     let activChallengeOn: ObjectId[] = [];
    //     await Promise.all(
    //       myActivChallenge.map(async (id) => {
    //         let activChallenge = await AuthService.findByIdActivChaleng(
    //           id as ObjectId
    //         );
    //         let challengeID = activChallenge?.challenge;
    //         let startDate = activChallenge?.startDate;
    //         let challenge = await AuthService.findByIdChaleng(
    //           challengeID as unknown as ObjectId
    //         );
    //         let duration = challenge?.duration;
    //         let endDate;
    //         if (startDate && duration) {
    //           endDate = new Date(startDate);
    //           endDate.setDate(endDate.getDate() + duration);
    //           if (endDate > new Date()) {
    //             activChallengeOn.push(id);
    //           }
    //         }
    //       })
    //     );
    //     const token = createToken({ userId: user.id, userPermission: "user" });
    //     return {
    //       user,
    //       invites: user.myInvites,
    //       myActivChallenge: activChallengeOn,
    //       token,
    //     };
    //   }
    //   static async findByIdActivChaleng(id: ObjectId) {
    //     return await this.activeChallengeController.readOne(id.toString());
    //   }
    //   static async findByIdChaleng(id: ObjectId) {
    //     return await this.ChallengeController.readOne(id);
    //   }
  }
}
