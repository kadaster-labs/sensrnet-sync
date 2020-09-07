import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Checkpoint } from './checkpoint.interface';

@Injectable()
export class CheckpointService {

  constructor(@InjectModel('Checkpoint') private checkpointModel: Model<Checkpoint>) {
  }

  async findOne(conditions: FilterQuery<any>): Promise<Checkpoint> {
    return await this.checkpointModel.findOne(conditions).exec();
  }

  async updateOne(conditions: FilterQuery<any>, update: UpdateQuery<any>): Promise<any> {
    const options = { upsert: true };
    return await this.checkpointModel.updateOne(conditions, update, options).exec();
  }
}
