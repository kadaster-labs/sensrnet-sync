"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorDeviceEventType = void 0;
const abstract_event_type_1 = require("../abstract-event-type");
const added_1 = require("./datastream/added");
const observation_goal_linked_1 = require("./datastream/observation-goal-linked");
const observation_goal_unlinked_1 = require("./datastream/observation-goal-unlinked");
const removed_1 = require("./datastream/removed");
const updated_1 = require("./datastream/updated");
const located_1 = require("./device/located");
const registered_1 = require("./device/registered");
const relocated_1 = require("./device/relocated");
const removed_2 = require("./device/removed");
const updated_2 = require("./device/updated");
const added_2 = require("./sensor/added");
const removed_3 = require("./sensor/removed");
const updated_3 = require("./sensor/updated");
class SensorDeviceEventType extends abstract_event_type_1.AbstractEventType {
    constructor() {
        super();
        this.add(registered_1.DeviceRegistered, registered_1.getDeviceRegisteredEvent);
        this.add(updated_2.DeviceUpdated, updated_2.getDeviceUpdatedEvent);
        this.add(removed_2.DeviceRemoved, removed_2.getDeviceRemovedEvent);
        this.add(located_1.DeviceLocated, located_1.getDeviceLocatedEvent);
        this.add(relocated_1.DeviceRelocated, relocated_1.getDeviceRelocatedEvent);
        this.add(added_2.SensorAdded, added_2.getSensorAddedEvent);
        this.add(updated_3.SensorUpdated, updated_3.getSensorUpdatedEvent);
        this.add(removed_3.SensorRemoved, removed_3.getSensorRemovedEvent);
        this.add(added_1.DatastreamAdded, added_1.getDatastreamAddedEvent);
        this.add(updated_1.DatastreamUpdated, updated_1.getDatastreamUpdatedEvent);
        this.add(removed_1.DatastreamRemoved, removed_1.getDatastreamRemovedEvent);
        this.add(observation_goal_linked_1.ObservationGoalLinked, observation_goal_linked_1.getObservationGoalLinkedEvent);
        this.add(observation_goal_unlinked_1.ObservationGoalUnlinked, observation_goal_unlinked_1.getObservationGoalUnlinkedEvent);
    }
}
exports.sensorDeviceEventType = new SensorDeviceEventType();
//# sourceMappingURL=sensordevice-event-type.js.map