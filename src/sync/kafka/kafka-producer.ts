import { KafkaClient, Producer } from 'kafka-node';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {readFileSync} from "fs";

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
        const kafkaCert = readFileSync('/run/secrets/kafka_certificate', 'utf-8');
        const kafkaPassword = readFileSync('/run/secrets/kafka_password', 'utf-8');
        const kafkaOptions = {
            kafkaHost: `${kafkaHost}:${kafkaPort}`,
        }
        if (kafkaCert && kafkaPassword) {
            kafkaOptions['ssl'] = true;
            kafkaOptions['sslOptions'] = {
                cert: kafkaCert,
                passphrase: kafkaPassword,
                requestCert: true,
                rejectUnauthorized: false
            }
        }

        this.client = new KafkaClient(kafkaOptions);
        this.producer = new Producer(this.client);
    }
}
