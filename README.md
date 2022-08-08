# Reto Indra

## Functions

- starwars-get-people
  Obtiene una persona en base al `id` de [SWAPI](https://swapi.dev/) o la base de datos local. Usar el parametro`source`( querystring ) para distingir la fuente de datos
- starwars-post-starships
  Crea la persona en la base de datos local

## Desarrollo Local
1) Crear archivo `.env` en base a [.env.dev](.env.example)


2) Arrancar servidor local:

    ```sh
    npm start
    ```

## Build

Solo empaqueta las funciones
```sh
npm run build
```

## Deploy

Empaqueta y deploya

```sh
npm run deploy
```

__NOTE__ Instalar y configurar primero [awscli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions) antes de ejecutar este comando

## Generar documentacion


```sh
npm run docs
```

__IMPORTANTE__ Paquete `serverless-openapi-documentation` esta descontinuado y tiene fallas. Seria necesario buscar otra opcion para mejorar este comando.

## Preparar Base de datos de prueba

Modificar el usuario por defecto
```
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'devved';

flush privileges;
```