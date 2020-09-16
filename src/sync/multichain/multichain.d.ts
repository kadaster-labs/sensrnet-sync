declare module 'multichain' {

  export interface MultichainConfiguration {
    hostname: string
    port: number
    username: string
    password: string
  }

  export interface Connection {
    getAddresses(): Promise<string>

    publish(transaction: Transaction): Promise<void>

    subscribe(settings: Settings): Promise<void>

    listStreamItems(settings: Settings): Promise<Item[]>

    grant(grant: Grant): Promise<void>

    create(stream: Stream): Promise<void>
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
