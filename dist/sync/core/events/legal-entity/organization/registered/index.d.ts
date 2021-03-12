import { EventMessage } from '../../../event-message';
import { OrganizationRegistered as V1 } from './organization-registered-v1.event';
export { OrganizationRegistered } from './organization-registered-v1.event';
export declare function getOrganizationRegisteredEvent(eventMessage: EventMessage): V1;
