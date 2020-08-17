# SensrNet Sync Application

This is the sync component for the SensRNet application. 
It features a NestJS API.

For more information see our [documentation](https://github.com/kadaster-labs/sensrnet-home/blob/master/docs/Architecture.md#component-sync) (and especially details about [HyperLedger Fabric](https://github.com/kadaster-labs/sensrnet-home/blob/master/docs/SyncFabricEN.md)).

## Architecture

Modules:

- **bridge** > the synchronization API to communicate with the eventstore.

## Getting Started

The stack can be run using docker.

### Prerequisities

In order to run this application containerized, you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

Start up:
Edit the multichain details in docker-compose.yml.

```bash
$ ./sync.sh up
```

Bringing down:

```bash
$ ./sync.sh down
```

## Find Us

* [GitHub](https://github.com/kadaster-labs/sensrnet-home)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Maintainers <a name="maintainers"></a>

Should you have any questions or concerns, please reach out to one of the project's [Maintainers](./MAINTAINERS.md).

## License

This work is licensed under a [EUPL v1.2 license](./LICENSE.md).
