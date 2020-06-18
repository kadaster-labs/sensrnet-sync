import { Schema } from 'mongoose';

export const StateSchema = new Schema({
    _id: { type: String, required: true },
    blockNumber: { type: Number, required: false },
});
