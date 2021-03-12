import { Checkpoint } from './checkpoint.interface';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
export declare class CheckpointService {
    private checkpointModel;
    constructor(checkpointModel: Model<Checkpoint>);
    findOne(conditions: FilterQuery<any>): Promise<Checkpoint>;
    updateOne(conditions: FilterQuery<any>, update: UpdateQuery<any>): Promise<any>;
}
