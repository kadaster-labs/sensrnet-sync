# Sync Component - Bridge

This is the bridge between the [SensRNet Registry Backend](https://github.com/kadaster-labs/sensrnet-backend) using the [Eventstore.com](https://eventstore.com/). The bridge reads published events from the eventstore and adds them unto the ledger. It also listens for new events added to the ledger to add them to the eventstore in case these are relevant for this [Registry Node](https://github.com/kadaster-labs/sensrnet-home/blob/master/docs/Architecture.md#component-registry).

Is is based on [NestJS](https://nestjs.com/):

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
