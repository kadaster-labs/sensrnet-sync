import { Injectable } from '@nestjs/common';

@Injectable()
export class MultichainConfiguration {

    get config() {
        const hostname = process.env.MULTICHAIN_HOST || '127.0.0.1';
        const port = parseInt(process.env.MULTICHAIN_PORT) || 8002;
        const username = process.env.MULTICHAIN_USER || 'multichainrpc'
        const password = process.env.MULTICHAIN_PASSWORD || 'password'

        return { hostname, port, username, password };
    }
}
