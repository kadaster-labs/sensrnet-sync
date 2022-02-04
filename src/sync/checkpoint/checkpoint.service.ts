import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Checkpoint } from './checkpoint.interface';

@Injectable()
export class CheckpointService {
    constructor(@InjectModel('Checkpoint') private checkpointModel: Model<Checkpoint>) {}

    async findOne(conditions: FilterQuery<Checkpoint>): Promise<Checkpoint> {
        return this.checkpointModel.findOne(conditions);
    }

    async updateOne(conditions: FilterQuery<Checkpoint>, update: UpdateQuery<Checkpoint>): Promise<any> {
        const options = { upsert: true };
        return this.checkpointModel.updateOne(conditions, update, options);
    }
}
