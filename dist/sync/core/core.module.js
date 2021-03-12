"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const multichain_config_1 = require("../../multichain.config");
const checkpoint_module_1 = require("../checkpoint/checkpoint.module");
const event_store_1 = require("../eventstore/event-store");
const event_store_module_1 = require("../eventstore/event-store.module");
const multichain_module_1 = require("../multichain/multichain.module");
const legal_entity_es_controller_1 = require("./controller/legal-entity.es.controller");
const legal_entity_mc_controller_1 = require("./controller/legal-entity.mc.controller");
const observation_goal_es_controller_1 = require("./controller/observation-goal.es.controller");
const observation_goal_mc_controller_1 = require("./controller/observation-goal.mc.controller");
const sensordevice_es_controller_1 = require("./controller/sensordevice.es.controller");
const sensordevice_mc_controller_1 = require("./controller/sensordevice.mc.controller");
const legal_entity_es_listener_1 = require("./processor/legal-entity.es.listener");
const legal_entity_mc_consumer_1 = require("./processor/legal-entity.mc.consumer");
const legal_entity_mc_producer_1 = require("./processor/legal-entity.mc.producer");
const observation_goal_es_listener_1 = require("./processor/observation-goal.es.listener");
const observation_goal_mc_consumer_1 = require("./processor/observation-goal.mc.consumer");
const observation_goal_mc_producer_1 = require("./processor/observation-goal.mc.producer");
const sensordevice_es_listener_1 = require("./processor/sensordevice.es.listener");
const sensordevice_mc_consumer_1 = require("./processor/sensordevice.mc.consumer");
const sensordevice_mc_producer_1 = require("./processor/sensordevice.mc.producer");
let CoreModule = CoreModule_1 = class CoreModule {
};
CoreModule = CoreModule_1 = __decorate([
    common_1.Module({
        imports: [
            checkpoint_module_1.CheckpointModule,
            event_store_module_1.EventStoreModule,
            multichain_module_1.MultiChainModule,
            CoreModule_1,
        ],
        controllers: [
            legal_entity_es_controller_1.LegalEntityEsController,
            legal_entity_mc_controller_1.LegalEntityMultiChainController,
            observation_goal_es_controller_1.ObservationGoalEsController,
            observation_goal_mc_controller_1.ObservationGoalMultiChainController,
            sensordevice_es_controller_1.SensorDeviceESController,
            sensordevice_mc_controller_1.SensorDeviceMultiChainController,
        ],
        providers: [
            event_store_1.EventStore,
            multichain_config_1.MultiChainConfig,
            legal_entity_es_listener_1.LegalEntityEsListener,
            observation_goal_es_listener_1.ObservationGoalEsListener,
            sensordevice_es_listener_1.SensorDeviceESListener,
            legal_entity_mc_consumer_1.LegalEntityMultiChainConsumer,
            legal_entity_mc_producer_1.LegalEntityMultiChainProducer,
            observation_goal_mc_consumer_1.ObservationGoalMultiChainConsumer,
            observation_goal_mc_producer_1.ObservationGoalMultiChainProducer,
            sensordevice_mc_consumer_1.SensorDeviceMultiChainConsumer,
            sensordevice_mc_producer_1.SensorDeviceMultiChainProducer,
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map