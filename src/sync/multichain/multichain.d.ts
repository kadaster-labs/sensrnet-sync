declare module 'multichain' {

  export interface MultichainConfiguration {
    hostname: string
    port: number
    username: string
    password: string
  }

  export interface Connection {
    getAddresses(): Promise<string[]>

    publish(transaction): Promise<void>

    subscribe(settings): Promise<void>

    listStreamItems(settings): Promise<Item[]>

    grant(grant): Promise<void>

    create(stream): Promise<void>

    approveFrom(details): Promise<void>
  }

  export interface Item {
    publishers: string[];
    keys: string[];
    data: string;
    txid: string;
    valid: boolean;
  }

  export interface ListStreamSettings {
    stream: string;
    start?: number;
    count?: number;
    verbose?: boolean;
  }

  export interface SubscribeSettings {
    stream: string;
    rescan?: boolean;
  }

}
