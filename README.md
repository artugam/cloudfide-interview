## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Example usage

```bash
Navigate to this url while app is running 

http://localhost:3000/?symbol=ETHUSDT&interval=1h&startTime=1730419200000&endTime=1731801600000

Parameters:
symbol: string;
interval: '1s' | '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';
startTime?: number; //Timestamp
endTime?: number; //Timestamp
```
