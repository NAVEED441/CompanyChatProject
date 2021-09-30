import { Document } from "mongoose";
export interface IUSER extends Document {
    _id: string;
    PictureUrl: string,
    Name: string;
    UserName: string;
    Password: string;
    createdAt?: string;
    updatedAt?: string;
}