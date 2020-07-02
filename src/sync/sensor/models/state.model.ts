import { Schema } from 'mongoose';

export const StateSchema = new Schema({
    _id: { type: String, required: true },
    offset: { type: Number, required: false },
});
