import { Schema, model } from "mongoose";
import { IADMIN } from "../types/document/IAdmin";

const IAdminSchema = new Schema({
    Name: { type: String },
    Email: { type: String },
    Password: { type: String }
},
    {
        timestamps: true
    }
);
export const AdminSchema = model<IADMIN>("AdminSchema", IAdminSchema);