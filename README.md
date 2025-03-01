# turbo-catalog-ms

## Overview

## Build

- **Install dependencies**
  `npm install`
- **Run locally using `.env.example` for local environment variables.**
  `npm run dev`

- **Run the project**
  1. Run command `docker-compose up --build -d` in the folder mysqldb to build and run the db.

## Environment Variables

- `TIMEZONE`: Timezone of the server.
- `PORT`: **Required**. Port for the web server to listen.
- `INTERNAL_MICROSERVICES_URL`: URL String to connect to Rappi's microservices (ms).
- `DB_HOST`: **Required**. Host to connect the DB.
- `DB_NAME`: **Required**. DB name to connect.
- `DB_PASSWORD`: **Required**. Password of the DB to connect.
- `DB_USER`: **Required**. User that has access to connect the DB.
- `DB_LOGGING`: **Required**. true | false value to log sql queries.
- `BASE_CONTEXT_PATH`: **Required**. Prefix of the microservice endpoints. For this ms is `/api/turbo-catalog-ms`
- `X_APPLICATION_ID`: **Required**. Microservice signature used when calling other ms.

## Sites of Interest

## Contributors

- Mozzarth

## fix docker compose up [creating WAL folder at "/wal": mkdir wal: permission denied]

execute this command

sudo mkdir -p ./docker-volumes/loki-data # Asegurar que la carpeta existe
sudo chown -R 10001:10001 ./docker-volumes/loki-data # Loki usa UID 10001
sudo chmod -R 777 ./docker-volumes/loki-data # Permisos abiertos (temporalmente)

## License

This project is property of Moises David Caicedo Corena
