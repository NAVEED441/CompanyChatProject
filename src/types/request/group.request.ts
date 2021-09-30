import { Messageinterface } from "../Messageinterface";

export interface SaveGruopReq {
    Name: string;

}
export interface DeletGruopReq {
    _id: string;
}
export interface AddUserInGruop {
    id: string;
    gruopId: string
}
export interface MessageInGroup {
    groupId: string,
    Messages: Messageinterface[]
}
export interface ReturnGroupMessage {
    _id: string
}
export interface CheckingMessage {
    _id: string,
    message: string
}