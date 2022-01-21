import { plainToClass } from 'class-transformer';
import { EventMessage } from '../../../event-message';
import { DatastreamAdded as V1 } from './datastream-added-v1.event';
import { DatastreamAdded as V2 } from './datastream-added-v2.event';

export { DatastreamAdded } from './datastream-added-v2.event';

function upcastEvent(event): V2 {
    if (event.version === V1.version) {
        const eventV2 = new V2(
            event.deviceId,
            event.sensorId,
            event.legalEntityId,
            event.datastreamId,
            event.name,
            event.description,
            event.unitOfMeasurement,
            event.observationArea,
            event.theme,
            event.dataQuality,
            event.isActive,
            event.isPublic,
            event.isOpenData,
            event.containsPersonalInfoData,
            event.isReusable,
            event.documentation,
            event.dataLink,
        );
        eventV2.setEventType(event.eventType);

        return upcastEvent(eventV2);
    } else if (event.version === V2.version) {
        return event;
    } else {
        return null;
    }
}

export function getDatastreamAddedEvent(eventMessage: EventMessage): V2 {
    if (!eventMessage.metadata.version || eventMessage.metadata.version === V1.version) {
        return upcastEvent(plainToClass(V1, eventMessage.data));
    } else if (eventMessage.metadata.version === V2.version) {
        return upcastEvent(plainToClass(V2, eventMessage.data));
    } else {
        return null;
    }
}
