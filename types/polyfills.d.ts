declare module 'multichain' {
  interface Connection {
    getAddresses(): string

    publish(transaction: Transaction): void

    subscribe(settings: Settings): void

    listStreamItems(settings: Settings): Item[]

    grant(grant: Grant): void

    create(stream: Stream): void
  }

  interface Settings {
    start: number;
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

  interface Transaction {
    key: string
    stream: string;
    data: string;
  }

  interface Item {
    data: string;
  }

  interface MultichainConfiguration {
    hostname: string
    port: number
    username: string
    password: string
  }

}
