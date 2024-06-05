import IMemberItem from '../../interfaces/IMemberItem'
import IStoreItem from '../../interfaces/IStoreItem'

export default interface GetMemberStoreCardsRes {
    memberCard: IMemberItem
    fullCard: IStoreItem
}