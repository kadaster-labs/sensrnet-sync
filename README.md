# SensrNet Sync Application

<p>
    <a href="https://github.com/kadaster-labs/sensrnet-sync/actions?query=workflow%3A%22Node.js+CI%22" alt="Build status">
        <img src="https://github.com/kadaster-labs/sensrnet-sync/workflows/Node.js%20CI/badge.svg" />
    </a>
    <a href="https://sonarcloud.io/dashboard?id=kadaster-labs_sensrnet-sync" alt="Quality Gate">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=kadaster-labs_sensrnet-sync&metric=alert_status" />
    </a>
</p>

This is the sync component for the SensRNet application.
It features a NestJS API.

For more information see our [documentation](https://github.com/kadaster-labs/sensrnet-home/blob/master/docs/Architecture.md#component-sync) (and especially details about [MultiChain](https://github.com/kadaster-labs/sensrnet-home/blob/master/docs/SyncMultiChainEN.md)).

## Architecture

The application features components to listen and write to the EventStore and MultiChain.

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
$ docker-compose up
```

Bringing down:

```bash
$ docker-compose stop
```

## Find Us

* [GitHub](https://github.com/kadaster-labs/sensrnet-home)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Maintainers <a name="maintainers"></a>

Should you have any questions or concerns, please reach out to one of the project's [Maintainers](./MAINTAINERS.md).

## License

This work is licensed under a [EUPL v1.2 license](./LICENSE.md).
