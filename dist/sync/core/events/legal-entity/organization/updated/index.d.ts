import { EventMessage } from '../../../event-message';
import { OrganizationUpdated as V1 } from './organization-updated-v1.event';
export { OrganizationUpdated } from './organization-updated-v1.event';
export declare function getOrganizationUpdatedEvent(eventMessage: EventMessage): V1;
