import { EventMessage } from '../../../event-message';
import { DatastreamAdded as V1 } from './datastream-added-v1.event';
export { DatastreamAdded } from './datastream-added-v1.event';
export declare function getDatastreamAddedEvent(eventMessage: EventMessage): V1;
