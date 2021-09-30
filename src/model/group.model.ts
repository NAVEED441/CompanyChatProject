import { Schema, model, Mongoose } from 'mongoose';
import { IGROUP } from '../types/document/IGROUP';
const IGroupSchema = new Schema(
    {

        Name: { type: String },
        Member: [{
            UserId: {
                type: Schema.Types.ObjectId,
                ref: 'USERSchema'

            }
        }],
        Message: [{
            User: {
                type: Schema.Types.ObjectId,
                ref: 'USERSchema'

            },
            Message: {
                type: String
            }
        },]

    },
    { timestamps: true }
);
export const GroupSchema = model<IGROUP>(' GruopSchema', IGroupSchema);