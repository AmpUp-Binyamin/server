import { ObjectId } from "mongoose"

export class CreateCoachRequest {
    fullName: string
    email: string
    phoneNumber: string
    picture: string
    link: string
    myChallenges: ObjectId[]

    constructor(fn = '', email = '', phoneN = '', pic = '', link = '', ch = []) {
        this.fullName = fn
        this.email = email
        this.phoneNumber = phoneN
        this.picture = pic
        this.link = link
        this.myChallenges = ch
    }
}

export class UpdateCoachRequest {
    fullName?: string
    email?: string
    phoneNumber?: string
    picture?: string
    link?: string
    myChallenges?: ObjectId[]

    constructor(fn = '', email = '', pn = '', pic = '', link = '', ch = []) {
        this.fullName = fn
        this.email = email
        this.phoneNumber = pn
        this.picture = pic
        this.link = link
        this.myChallenges = ch
    }
}
