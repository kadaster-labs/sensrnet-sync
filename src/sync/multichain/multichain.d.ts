declare module 'multichain' {

  export interface MultichainConfiguration {
    hostname: string
    port: number
    username: string
    password: string
  }

  export interface Connection {
    getAddresses(): string

    publish(transaction: Transaction): void

    subscribe(settings: Settings): void

    listStreamItems(settings: Settings): Item[]

    grant(grant: Grant): void

    create(stream: Stream): void
  }

  export interface Settings {
    start?: number;
    stream: string;
  }

  interface Grant {
    addresses: string;
    permissions: string;

  }

  interface Stream {
    open: boolean
    name: string
    type: string
  }

  export interface Transaction {
    key: string
    stream: string;
    data: string;
  }

  export interface Item {
    data: string;
  }

}
