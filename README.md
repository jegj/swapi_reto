# Reto Indra

## Functions

- starwars-get-people
- starwars-post-starships

## Local
1) Crear archivo `.env` en base a [.env.dev](.env.example)


2) Arrancar servidor local:

    ```sh
    npm start
    ```

## Build

```sh
npm run build
```

## Deploy


```sh
npm run deploy
```

## Preparar Base de datos de prueba

Modificar el usuario por defecto 
```
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'devved';

flush privileges;
```