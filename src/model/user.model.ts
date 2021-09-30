import { Schema, model, Mongoose } from 'mongoose';
import { IUSER } from '../types/document/IUSER';
const IUSERSchema = new Schema(
  {
    PictureUrl: { type: String },
    Name: { type: String },
    UserName: { type: String, required: true },

    Password: { type: String, required: true }
  },
  { timestamps: true }
);
export const USERSchema = model<IUSER>(' UserSchema', IUSERSchema);