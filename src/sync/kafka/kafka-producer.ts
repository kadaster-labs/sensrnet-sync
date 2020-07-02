import { KafkaClient, Producer } from 'kafka-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KafkaProducer implements OnModuleInit {

    private topic: string;
    private producer: Producer;
    private client: KafkaClient;
    protected logger: Logger = new Logger(this.constructor.name);

    writeEvent(event) {
        const payloads = [
            { topic: this.topic, key: event.eventId, messages: JSON.stringify(event), partition: 0 }
        ];

        this.producer.send(payloads, (err, _) => {
            if (err) {
                this.logger.log(`Error occurred while writing to kafka: ${err}.`);
            }
        });
    }

    onModuleInit() {
        this.topic = process.env.KAFKA_TOPIC || 'sync';
        const kafkaPort = process.env.KAFKA_PORT || 9092;
        const kafkaHost = process.env.KAFKA_HOST || 'localhost';

        this.client = new KafkaClient({ kafkaHost: `${kafkaHost}:${kafkaPort}` });
        this.producer = new Producer(this.client);
    }
}
