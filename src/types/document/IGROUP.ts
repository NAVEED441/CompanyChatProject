import { Document } from "mongoose";
import { MemberInterface } from "../MemberInterface";
import { Messageinterface } from "../Messageinterface";

export interface IGROUP extends Document {
    _id: string;
    Name: string;
    Member: MemberInterface[]
    Message: Messageinterface[]
    createdAt?: string;
    updatedAt?: string;

}