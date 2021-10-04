import { MemberInterface } from "../MemberInterface";
import { Messageinterface } from "../Messageinterface";

export interface SaveUpdateResgroup {
    id:string;
    Name:string;
    Member:MemberInterface[];
    Message:Messageinterface[];
    createdAt?: string;
    updatedAt?: string;

}


export interface CheckMsgResGroup {
    Group : string,
    Result: Message[]
}
interface Message {
    User: string
    Message: string
}