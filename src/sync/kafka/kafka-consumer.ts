import { KafkaClient, Consumer, Message } from 'kafka-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KafkaConsumer implements OnModuleInit {

    private topic: string;
    private consumer: Consumer;
    private client: KafkaClient;
    protected logger: Logger = new Logger(this.constructor.name);

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
        const kafkaPort = process.env.KAFKA_PORT || 9092;
        const kafkaHost = process.env.KAFKA_HOST || 'localhost';
        this.client = new KafkaClient({ kafkaHost: `${kafkaHost}:${kafkaPort}` });

        const fetchRequest = [{ topic: this.topic, partition: 0 }]
        this.consumer = new Consumer(this.client, fetchRequest, { autoCommit: false });
    }
}
