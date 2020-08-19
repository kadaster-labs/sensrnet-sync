import { Injectable } from '@nestjs/common';

@Injectable()
export class MultichainConfiguration {

    get config() {
        const port = parseInt(process.env.MULTICHAIN_PORT) || 8002;
        const hostname = process.env.MULTICHAIN_HOST || '127.0.0.1';
        const password = process.env.MULTICHAIN_PASSWORD || 'password';
        const username = process.env.MULTICHAIN_USER || 'multichainrpc';

        return { hostname, port, username, password };
    }
}
