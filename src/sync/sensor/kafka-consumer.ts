import { KafkaClient, Consumer, Message } from 'kafka-node';
import { KafkaConfiguration } from '../../kafka.configuration';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CheckpointService } from '../checkpoint/checkpoint.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit {

    private topic: string;
    private consumer: Consumer;
    private client: KafkaClient;
    private checkpointId: string = 'sync-sensor-kafka';

    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly checkpointService: CheckpointService,
        private readonly kafkaConfiguration: KafkaConfiguration
    ){};

    async registerListener(callback) {
        this.consumer.on('message', async (message: Message) => {
            try {
                const obj = JSON.parse(message.value.toString());
                await callback(obj);

                const updateOffset = { offset: message.offset + 1 }
                await this.checkpointService.updateOne({_id: this.checkpointId}, updateOffset);
            } catch {
                this.logger.warn('Failed to process kafka message.');
            }
        });
    }

    async onModuleInit() {
        this.topic = process.env.KAFKA_TOPIC || 'sync';
        const config = this.kafkaConfiguration.config;

        this.logger.log(`Connecting Kafka consumer to host ${config.kafkaHost}.`);
        if (config['ssl']) {
            this.logger.log(`Consumer TLS is enabled.`);
        } else {
            this.logger.log(`Consumer TLS is disabled. Supply a certificate and password to use TLS.`);
        }

        this.client = new KafkaClient(config);
        const data = await this.checkpointService.findOne({_id: this.checkpointId});

        const offset = data ? data.offset : 0;
        const fetchRequest = [{ topic: this.topic, partition: 0, offset: offset }];
        this.logger.log(`Subscribing to Kafka topic ${this.topic} from offset ${offset}.`);

        this.consumer = new Consumer(this.client, fetchRequest, { autoCommit: false, fromOffset: true });
    }
}
