import { KafkaClient, Producer } from 'kafka-node';
import { KafkaConfiguration } from '../../kafka.configuration';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KafkaProducer implements OnModuleInit {

    private topic: string;
    private producer: Producer;
    private client: KafkaClient;
    protected logger: Logger = new Logger(this.constructor.name);

    constructor(
        private readonly kafkaConfiguration: KafkaConfiguration
    ){};

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
        this.client = new KafkaClient(this.kafkaConfiguration.config);
        this.producer = new Producer(this.client);
    }
}
