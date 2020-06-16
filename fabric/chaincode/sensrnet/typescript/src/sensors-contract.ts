import {Context, Contract, Default, Info, Transaction} from 'fabric-contract-api';
import {EventMessage} from './events/event-message';
import {SensorsContext} from './sensors-context';
import {sensorEventType} from './events/sensor';
import {ownerEventType} from './events/owner';

@Info({
  contact: {
    name: 'SensRNet-SensorsCC',
    url: 'https://github.com/kadaster-labs/sensrnet-sync/fabric/chaincode',
  },
  description: 'This is the chaincode to interact with with SensRNet sensors ledger.',
  license: {
    name: 'EUPL 1.2',
    url: 'https://eupl.eu/',
  },
  title: 'SensRNet-Sensors ChainCode',
  version: '0.0.1',
})
@Default()
export class SensorsContract extends Contract {
  private supportedEventTypes: string[] = [];

  constructor() {
    super('Sensors');
    this.supportedEventTypes = this.supportedEventTypes.concat(sensorEventType.getSupportedEventTypes());
    this.supportedEventTypes = this.supportedEventTypes.concat(ownerEventType.getSupportedEventTypes());
  }

  createContext(): SensorsContext {
    return new SensorsContext();
  }

  @Transaction()
  async initLedger(ctx: Context) {
    // tslint:disable-next-line:no-console
    console.info('============= START : Initialize Ledger ===========');

    const sensors: object[] = [
      {
        sensorId: '1',
        nodeId: '1',
        ownerId: '1',
        name: 'Camera',
      },
      {
        sensorId: '2',
        nodeId: '1',
        ownerId: '1',
        name: 'Verkeerslicht',
      },
    ];

    for (let i = 0; i < sensors.length; i++) {
      // @ts-ignore
      sensors[i].docType = 'sensor';
      await ctx.stub.putState('SENSOR' + i, Buffer.from(JSON.stringify(sensors[i])));
      // tslint:disable-next-line:no-console
      console.info('Added <--> ', sensors[i]);
    }

    // tslint:disable-next-line:no-console
    console.info('============= END : Initialize Ledger ===========');
  }

  @Transaction()
  publishEvent(ctx: Context, payload: string) {
    // tslint:disable-next-line:no-console
    console.log(`publish event: [${payload}]`);

    const obj = JSON.parse(payload);
    if (!!this.supportedEventTypes.includes(obj.eventType)) {
      throw new InvalidTransactionCallException();
    }

    // TODO other validations on the posted payload / events

    const msg = EventMessage.fromPayload(obj, obj.eventType);
    ctx.stub.putState(msg.messageId, Buffer.from(JSON.stringify(msg)));
  }

}
