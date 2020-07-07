import { KafkaClient, Consumer, Message } from 'kafka-node';
import { KafkaConfiguration } from '../../kafka.configuration';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KafkaConsumer implements OnModuleInit {

    private topic: string;
    private consumer: Consumer;
    private client: KafkaClient;
    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly kafkaConfiguration: KafkaConfiguration
    ){};

    registerListener(callback) {
        this.consumer.on('message', (message: Message) => {
            try {
                const obj = JSON.parse(message.value.toString());
                callback(obj);
            } catch {
                this.logger.warn('Failed to parse kafka message.');
            }
        });
    }

    onModuleInit() {
        this.topic = process.env.KAFKA_TOPIC || 'sync';
        this.client = new KafkaClient(this.kafkaConfiguration.config);
        const fetchRequest = [{ topic: this.topic, partition: 0 }];
        this.consumer = new Consumer(this.client, fetchRequest, { autoCommit: false });
    }
}
