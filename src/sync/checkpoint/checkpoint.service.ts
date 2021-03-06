import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Checkpoint } from './checkpoint.interface';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectModel('Checkpoint') private checkpointModel: Model<Checkpoint>,
  ) {}

  async findOne(conditions: FilterQuery<any>): Promise<Checkpoint> {
    return this.checkpointModel.findOne(conditions);
  }

  async updateOne(conditions: FilterQuery<any>, update: UpdateQuery<any>): Promise<any> {
    const options = { upsert: true };
    return this.checkpointModel.updateOne(conditions, update, options);
  }
}
