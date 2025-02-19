# turbo-catalog-ms

## Overview


## Build

* __Install dependencies__
  ``
  npm install
  ``
* __Run locally using `.env.example` for local environment variables.__
  ``
  npm run dev
  ``

* __Run the project__
  1. Run command `docker-compose up --build -d` in the folder mysqldb to build and run the db.

## Environment Variables

* `TIMEZONE`: Timezone of the server.
* `COUNTRY`: Country to use for the server.
* `COUNTRY_CODE`: Country to use for the server.
* `LOCALE`: Same as `COUNTRY`.
* `PORT`: __Required__. Port for the web server to listen.
* `INTERNAL_MICROSERVICES_URL`: URL String to connect to Rappi's microservices (ms).
* `DB_HOST`: __Required__. Host to connect the DB.
* `DB_NAME`: __Required__. DB name to connect.
* `DB_PASSWORD`: __Required__. Password of the DB to connect.
* `DB_USER`: __Required__. User that has access to connect the DB.
* `DB_LOGGING`: __Required__. true | false value to log sql queries.
* `BASE_CONTEXT_PATH`: __Required__. Prefix of the microservice endpoints. For this ms is `/api/turbo-catalog-ms`
* `X_APPLICATION_ID`: __Required__. Microservice signature used when calling other ms.

## Sites of Interest


## Contributors

* Mozzarth

## License

This project is property of Moises David Caicedo Corena
