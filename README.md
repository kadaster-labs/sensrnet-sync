# SensRNet Sync Application

<p>
    <a href="https://github.com/kadaster-labs/sensrnet-sync/actions?query=workflow%3A%22Node.js+CI%22" alt="Build status">
        <img src="https://github.com/kadaster-labs/sensrnet-sync/workflows/Node.js%20CI/badge.svg" />
    </a>
    <a href="https://sonarcloud.io/dashboard?id=kadaster-labs_sensrnet-sync" alt="Quality Gate">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=kadaster-labs_sensrnet-sync&metric=alert_status" />
    </a>
</p>

This is the repo for the sync component of the SensrNet application. It features a NodeJS API, for administrative
purposes.

For more information see our [documentation](https://github.com/kadaster-labs/sensrnet-home/blob/main/docs/Architecture.md#component-sync) (and especially details about [MultiChain](https://github.com/kadaster-labs/sensrnet-home/blob/main/docs/SyncMultiChainEN.md)).

## Architecture

The component features functionality to listen and write to the Eventstore and MultiChain. This way incoming and 
outgoing events can be written and published to the network.

## Getting Started

The stack can be ran either locally, using docker with docker-compose, or deployed on a kubernetes cluster.

### Prerequisities

In order to run this application containerized, you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

#### Modules:

- health: Functionality to determine the application health.
- sync:
    - checkpoint: Interface to interact with checkpoints.
    - core: Module to read and write from Eventstore and MultiChain.
    - eventstore: Interface to Eventstore.
    - multichain: Interface to MultiChain.

### Usage

#### Standalone

Eventstore:
* Should be running. For instructions, view the [Eventstore Documentation](https://developers.eventstore.com/).

MongoDB:
* Should be running. For instructions, view the [MongoDB Documentation](https://docs.mongodb.com/manual/installation/).

MultiChain:
* Should be running. For instructions, view the [MultiChain Documentation](https://www.multichain.com/).

Sync App:
* npm ci
* npm start

#### Containerized

Start component:
Edit the multichain details in docker-compose.yml.

```bash
$ docker-compose up --build
```
* [Sync Component OpenAPI](http://localhost:3500/api/)

Bringing down:

```bash
$ docker-compose stop
```
### Node Administration

## Multichain Node

The API features functionality to retrieve the multichain blockchain address. This address can be granted permissions 
by different nodes in the network (e.g. send or create) using the grant API method. Nodes need at least send permissions
before they can write to the blockchain network. Furthermore, the API contains 
functionality for creating streams and transactions, and (dis)approving smart filters. The API methods are documented
following the OpenAPI specification.

## Checkpoints

Eventstore and Multichain checkpoints can be retrieved and updated using the ES and MC API methods. When a checkpoint 
is reset to a lower value, the events with these numbers will be retrieved from either the Eventstore or Multichain, 
and reprocessed.

## Find Us

* [GitHub](https://github.com/kadaster-labs/sensrnet-home)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Maintainers <a name="maintainers"></a>

Should you have any questions or concerns, please reach out to one of the project's [Maintainers](./MAINTAINERS.md).

## License

This work is licensed under a [EUPL v1.2 license](./LICENSE.md).
