"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMultiChainProducer = void 0;
const common_1 = require("@nestjs/common");
const legal_entity_1 = require("../events/legal-entity");
const observation_goal_1 = require("../events/observation-goal");
const sensordevice_1 = require("../events/sensordevice");
const retry_1 = require("./retry");
class AbstractMultiChainProducer {
    constructor(streamName, multichainService) {
        this.streamName = streamName;
        this.multichainService = multichainService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.retryMechanism = new retry_1.Retry(10);
    }
    inSupportedAggregateCreationEvents(event) {
        return event instanceof legal_entity_1.OrganizationRegistered
            || event instanceof sensordevice_1.DeviceRegistered
            || event instanceof observation_goal_1.ObservationGoalRegistered;
    }
    async publishEvent(event) {
        let processed, eventMessage;
        try {
            eventMessage = JSON.stringify(event);
            processed = false;
        }
        catch (_a) {
            processed = true;
        }
        if (event.aggregateId) {
            while (!processed) {
                try {
                    if (this.inSupportedAggregateCreationEvents(event)) {
                        try {
                            const name = event.aggregateId.split('-').join('');
                            await this.multichainService.createVariable(name, { addresses: this.addresses });
                        }
                        catch (e) {
                            this.logger.warn(e.message);
                        }
                    }
                    await this.multichainService.createTransaction(this.streamName, event.aggregateId, eventMessage);
                    processed = true;
                }
                catch (e) {
                    this.logger.error(`Failed to publish transaction: ${e.message}.`);
                    this.retryMechanism.incrementRetryCount();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
        this.retryMechanism.resetRetryCount();
    }
    async onModuleInit() {
        try {
            this.addresses = await this.multichainService.getAddresses();
        }
        catch (e) {
            this.logger.error(`Failed to retrieve blockchain addresses ${e.message}. Exiting.`);
            process.exit(0);
        }
    }
}
exports.AbstractMultiChainProducer = AbstractMultiChainProducer;
//# sourceMappingURL=abstract.mc.producer.js.map