import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

const getFileContent = (location) => {
    let content;
    try {
        content = readFileSync(location, 'utf-8');
    } catch (_) {}

    return content;
}

@Injectable()
export class KafkaConfiguration {

    get config() {
        const hostname = process.env.KAFKA_HOST || 'localhost'
        const port = parseInt(process.env.KAFKA_PORT) || 9092;
        const password = getFileContent('/run/secrets/kafka_password');
        const certificate = getFileContent('/run/secrets/kafka_certificate');

        const kafkaOptions = {
            kafkaHost: `${hostname}:${port}`,
        }
        if (certificate && password) {
            kafkaOptions['ssl'] = true;
            kafkaOptions['sslOptions'] = {
                cert: certificate,
                passphrase: password,
                requestCert: true,
                rejectUnauthorized: false
            }
        }

        return kafkaOptions;
    }
}
