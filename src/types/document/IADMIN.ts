import { Document } from "mongoose";

export interface IADMIN extends Document {
    _id: string;
    Name: string;
    Email: string;
    Password: string;
    createdAt?: string;
    updatedAt?: string;

}