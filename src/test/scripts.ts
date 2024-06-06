import ChallengeModel from "../models/ChallengeModel"


const subtypes = ['multipleChoice', 'url', 'freeText', 'upload', 'multipleChoice+freeText']
const changeTheChallengeToTask = async () => {
   const challenge = await ChallengeModel.findById('6656df1b8437151db0cce539')
   // @ts-ignore
   challenge.cards = challenge?.cards.map(card => card.cardType === 'challenge' ? { ...card, cardType: 'task' } : card)
   // @ts-ignore
   challenge.cards = challenge?.cards.map(card => card.media  ? {...card, media: {...card.media, type: 'audio', fileName: "musix.mp3", path: 'https://ampup-ypreiser.s3.eu-north-1.amazonaws.com/1717507380231_%C3%97%C2%94%C3%97%C2%AA%C3%97%C2%A7%C3%97%C2%95%C3%97%C2%95%C3%97%C2%94%206%20-%20%C3%97%C2%94%C3%97%C2%9E%C3%97%C2%A0%C3%97%C2%95%C3%97%C2%9F%20%C3%97%C2%94%C3%97%C2%9C%C3%97%C2%95%C3%97%C2%97%C3%97%C2%9D%20%28%C3%97%C2%A2%C3%97%C2%99%C3%97%C2%93%C3%97%C2%95%20%C3%97%C2%A9%C3%97%C2%95%C3%97%C2%94%C3%97%C2%9D%20%C3%97%C2%A8%C3%97%C2%9E%C3%97%C2%99%C3%97%C2%A7%C3%97%C2%A1%29%20%28128kbps%29.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4MTWMB6RI6TUC75I%2F20240604%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20240604T132301Z&X-Amz-Expires=604800&X-Amz-Signature=4669f4f5acdb1f7672e2beb0cb7596052ff969e887f75058f18c41065163f74f&X-Amz-SignedHeaders=host&x-id=GetObject'}} : card)
   // @ts-ignore
   challenge.cards = challenge?.cards.map(card => card.subType  ? { ...card, subType: subtypes[Math.floor(Math.random() * subtypes.length)] } : card)
   // @ts-ignore
   await ChallengeModel.findByIdAndUpdate('6656df1b8437151db0cce539', {cards:  challenge.cards})
   console.log('finish');

}

// changeTheChallengeToTask()