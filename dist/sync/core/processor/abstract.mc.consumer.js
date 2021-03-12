"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMsConsumer = void 0;
const retry_1 = require("./retry");
const common_1 = require("@nestjs/common");
class AbstractMsConsumer {
    constructor(streamName, checkpointId, eventStoreService, checkpointService, multichainService) {
        this.streamName = streamName;
        this.checkpointId = checkpointId;
        this.eventStoreService = eventStoreService;
        this.checkpointService = checkpointService;
        this.multichainService = multichainService;
        this.loopInterval = 1000;
        this.logger = new common_1.Logger(this.constructor.name);
        this.retryMechanism = new retry_1.Retry(10);
    }
    async getOffset() {
        const checkpoint = await this.checkpointService.findOne({ _id: this.checkpointId });
        return checkpoint ? checkpoint.offset : 0;
    }
    async setOffset(offset) {
        await this.checkpointService.updateOne({ _id: this.checkpointId }, { offset });
    }
    async listenerLoop() {
        const offset = await this.getOffset();
        try {
            const items = await this.multichainService.listStreamItems(this.streamName, offset, 10, true);
            for (let i = 0; i < items.length; i++) {
                const streamData = Buffer.from(items[i].data, 'hex').toString();
                try {
                    if (!items[i].publishers.some((publisher) => this.addresses.includes(publisher))) {
                        const event = JSON.parse(streamData);
                        const { version, eventType } = event, data = __rest(event, ["version", "eventType"]);
                        const eventMessage = { data, metadata: { version }, eventType };
                        await this.publishToEventStore(eventMessage);
                    }
                }
                catch (e) {
                    this.logger.warn(`Failed to parse stream message '${streamData}' as event; error: ${e.message}`);
                }
                await this.setOffset(offset + i + 1);
                this.retryMechanism.resetRetryCount();
            }
        }
        catch (e) {
            if (e.code === -703) {
                await this.multichainService.subscribe(this.streamName);
            }
            else if (e.code === 'ECONNREFUSED' || e.code == 'ECONNRESET') {
                this.retryMechanism.incrementRetryCount();
                this.multichainService.initConnection();
            }
            else {
                this.retryMechanism.incrementRetryCount();
                this.logger.error(`Error occurred processing event from multichain: ${e.message}`);
            }
        }
        setTimeout(() => this.listenerLoop(), this.loopInterval);
    }
    async onModuleInit() {
        try {
            this.addresses = await this.multichainService.getAddresses();
        }
        catch (e) {
            this.logger.error(`Failed to retrieve blockchain addresses ${e.message}. Exiting.`);
            process.exit(0);
        }
        const disableReading = process.env.DISABLE_CHAIN_READ ? process.env.DISABLE_CHAIN_READ === 'true' : false;
        if (!disableReading) {
            common_1.Logger.debug(`Started listening to stream ${this.streamName} on chain.`);
            await this.listenerLoop();
        }
    }
}
exports.AbstractMsConsumer = AbstractMsConsumer;
//# sourceMappingURL=abstract.mc.consumer.js.map