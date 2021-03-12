import { EventMessage } from '../../../event-message';
import { DatastreamRemoved as V1 } from './datastream-removed-v1.event';
export { DatastreamRemoved } from './datastream-removed-v1.event';
export declare function getDatastreamRemovedEvent(eventMessage: EventMessage): V1;
