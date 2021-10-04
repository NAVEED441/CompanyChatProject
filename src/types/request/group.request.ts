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
    Message: Messageinterface[]
}
export interface ReturnGroupMessage {
   Msg: string
}
export interface CheckingMessage {
    _id: string,
    message: string
}