import {Context} from 'fabric-contract-api';

export class SensorsContext extends Context {
  public readonly nodeId: string;

  constructor() {
    super();
    this.nodeId = process.env.nodeId;
  }

}
