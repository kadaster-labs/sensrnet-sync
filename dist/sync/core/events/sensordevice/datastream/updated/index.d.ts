import { EventMessage } from '../../../event-message';
import { DatastreamUpdated as V1 } from './datastreamupdated-v1.event';
export { DatastreamUpdated } from './datastreamupdated-v1.event';
export declare function getDatastreamUpdatedEvent(eventMessage: EventMessage): V1;
