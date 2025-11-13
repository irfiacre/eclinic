## eClinic - Backend

Link - https://eclinic-backend.vercel.app/

## Prerequisite:

- Node version: 20.xx
- Postgresql: 17
- Environmental variables:

  ```bash
  DATABASE_URL=<POSTGRES_DB_URL>
  PORT=XXXXX (optional, but on mac the default port is sometimes used by system processes).
  JWT_SECRET=XXXXXXX
  ```

- You've cloned the [repository](git@github.com:irfiacre/eclinic.git).

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
