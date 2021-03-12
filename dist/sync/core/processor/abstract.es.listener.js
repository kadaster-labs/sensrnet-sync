"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractESListener = void 0;
const common_1 = require("@nestjs/common");
const no_subscription_exception_1 = require("../errors/no-subscription-exception");
const subscription_exists_exception_1 = require("../errors/subscription-exists-exception");
class AbstractESListener {
    constructor(streamName, checkpointId, eventType, eventStoreService, checkpointService, multichainProducer) {
        this.streamName = streamName;
        this.checkpointId = checkpointId;
        this.eventType = eventType;
        this.eventStoreService = eventStoreService;
        this.checkpointService = checkpointService;
        this.multichainProducer = multichainProducer;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    getSubscription() {
        return this.subscription;
    }
    setSubscription(subscription) {
        this.subscription = subscription;
    }
    subscriptionExists() {
        return !!this.getSubscription();
    }
    closeSubscription() {
        if (this.subscription) {
            this.subscription.stop();
            this.subscription = null;
        }
        else {
            throw new no_subscription_exception_1.NoSubscriptionException();
        }
    }
    async openSubscription() {
        if (!this.subscriptionExists()) {
            await this.subscribeToStreamFromLastOffset();
        }
        else {
            throw new subscription_exists_exception_1.SubscriptionExistsException();
        }
    }
    async getOffset() {
        const checkpoint = await this.checkpointService.findOne({ _id: this.checkpointId });
        return checkpoint ? checkpoint.offset : -1;
    }
    async setOffset(offset) {
        if (!this.subscriptionExists()) {
            await this.checkpointService.updateOne({ _id: this.checkpointId }, { offset });
        }
        else {
            throw new subscription_exists_exception_1.SubscriptionExistsException();
        }
    }
    async subscribeToStreamFromLastOffset() {
        const timeoutMs = process.env.EVENT_STORE_TIMEOUT ? Number(process.env.EVENT_STORE_TIMEOUT) : 10000;
        const exitCallback = () => {
            this.logger.error(`Failed to connect to EventStore. Exiting.`);
            process.exit(0);
        };
        const droppedCallback = (_, reason) => {
            if (reason !== 'userInitiated') {
                exitCallback();
            }
        };
        const timeout = setTimeout(exitCallback, timeoutMs);
        try {
            const offset = await this.getOffset();
            this.logger.log(`Subscribing to ES stream ${this.streamName} from offset ${offset}.`);
            const onEvent = async (_, eventMessage) => {
                if (eventMessage.positionEventNumber > offset) {
                    const conditions = { _id: this.checkpointId };
                    const update = { offset: eventMessage.positionEventNumber };
                    const callback = async () => this.checkpointService.updateOne(conditions, update);
                    if (!eventMessage.metadata || !eventMessage.metadata.originSync) {
                        const eventData = Object.assign(Object.assign({}, eventMessage), { data: Object.assign(Object.assign({}, eventMessage.data), { eventType: eventMessage.eventType }) });
                        const event = this.eventType.getEvent(eventData);
                        if (event) {
                            await this.multichainProducer.publishEvent(event);
                        }
                    }
                    await callback();
                }
            };
            try {
                const subscription = await this.eventStoreService.subscribeToStreamFrom(this.streamName, offset, onEvent, null, droppedCallback);
                clearTimeout(timeout);
                this.setSubscription(subscription);
            }
            catch (_a) {
                this.logger.error(`Failed to subscribe to stream ${this.streamName}.`);
            }
        }
        catch (_b) {
            this.logger.error(`Failed to determine offset of stream ${this.streamName}.`);
        }
    }
    async onModuleInit() {
        await this.openSubscription();
    }
}
exports.AbstractESListener = AbstractESListener;
//# sourceMappingURL=abstract.es.listener.js.map