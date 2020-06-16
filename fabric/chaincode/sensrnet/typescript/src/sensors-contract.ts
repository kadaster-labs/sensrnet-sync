import {Context, Contract, Default, Info, Transaction} from 'fabric-contract-api';
import {Event} from './events/event';
import {EventMessage} from './events/event-message';
import {SensorsContext} from './SensorsContext';

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

  constructor() {
    super('Sensors');
  }

  createContext(): SensorsContext {
    return new SensorsContext();
  }

  @Transaction()
  publishEvent(ctx: Context, event: Event) {
    // tslint:disable-next-line:no-console
    console.log(`publish event: [${JSON.stringify(event)}]`);
    const msg = EventMessage.fromEvent(event);
    // TODO save to ledger
  }

  @Transaction()
  sensorRegistered(ctx: SensorsContext, sensorId: string, nodeId: string, ownerId: string,
                   name: string, longitude: number, latitude: number, height: number,
                   baseObjectId: string, aim: string, description: string,
                   manufacturer: string, active: boolean, observationArea: object,
                   documentationUrl: string, theme: string[], typeName: string,
                   typeDetails: object) {

    if (nodeId !== ctx.nodeId) {
      throw new InvalidTransactionCallException();
    }
    // TODO save to ledger
  }

}
