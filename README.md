# SensrNet Sync Application

This is the sync component for the SensrNet application. It features a NestJS API, and makes use of Hyperledger Fabric.

## Getting Started

The stack can be ran using docke.

### Prerequisities

In order to run this application containerized, you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Architecture

Modules:

- bridge > the synchronization API to communicate with the backend.
- fabric > the Hyperledger Fabric code for synchronization.

### Usage

#### Containerized
Hyperledger Fabric:
```
./network.sh down
./network.sh up createChannel -ca
./network.sh deployCC -l javascript
```

## Find Us

* [GitHub](https://github.com/kad-floriw)

## Contributing

(TODO) Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Marc van Andel** - *Initial work* - [Kadaster](https://kadaster.nl)
* **Wim Florijn** - *Initial work* - [Kadaster](https://kadaster.nl)

See also the list of [contributors](https://github.com/your/repository/contributors) who 
participated in this project.

## License

This project is licensed under the EUPL License - see the [LICENSE.md](LICENSE.md) file for details.
