import { EventMessage } from '../../event-message';
import { OrganizationDeleted as V1 } from './organization-deleted-v1.event';
export { OrganizationDeleted } from './organization-deleted-v1.event';
export declare function getOrganizationDeletedEvent(eventMessage: EventMessage): V1;
