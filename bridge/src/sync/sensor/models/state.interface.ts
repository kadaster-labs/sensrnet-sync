import { Document } from 'mongoose';

export interface State extends Document {
    _id: string; // channel name
    blockNumber: number;
}
