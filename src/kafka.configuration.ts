import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

const getFileContent = (location) => {
    let content;
    try {
        content = readFileSync(location, 'utf-8');
    } catch {}

    return content;
}

@Injectable()
export class KafkaConfiguration {

    get config() {
        const hostname = process.env.KAFKA_HOST || 'localhost'
        const port = parseInt(process.env.KAFKA_PORT) || 9092;
        const passwordLocation = process.env.KAFKA_PASSWORD_LOCATION || '/etc/kafka/ca.password';
        const certificateLocation = process.env.KAFKA_CERTIFICATE_LOCATION || '/etc/kafka/ca.crt';
        const password = getFileContent(passwordLocation);
        const certificate = getFileContent(certificateLocation);

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
