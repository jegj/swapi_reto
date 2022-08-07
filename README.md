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

## Estructura del Proyecto

<!-- ### Create

```sh
aws lambda create-function \
    --function-name deals-stellantis-stage \
    --runtime nodejs16.x \
    --zip-file fileb://.serverless/deals.zip \
    --handler src/functions/deals/index.handler \
    --role arn:aws:iam::181225706767:role/APIMigration
    --timeout 180
    --vpc-config SubnetIds=subnet-0f1b8f80853973e08,subnet-0640066f35b8f61c1,SecurityGroupIds=sg-0b78d5b8363358dc1,sg-090516498a4837302
```
Adding permissions to execute the function from event-bridge

```sh
aws lambda add-permission \
--function-name deals-stellantis-stage \
--statement-id id0 \
--action 'lambda:InvokeFunction' \
--principal events.amazonaws.com \
--source-arn arn:aws:schemas:us-east-2:181225706767:discoverer/events-event-bus-LightYearEventBus
```
### Update
```sh
aws lambda update-function-code \
    --function-name deals-stellantis-stage \
    --zip-file fileb://.serverless/deals.zip
```

```sh
aws lambda update-function-configuration \
    --function-name deals-stellantis-stage \
    --handler src/functions/deals/index.handler \
    --role arn:aws:iam::181225706767:role/APIMigration \
    --timeout 180 \
    --vpc-config SubnetIds=subnet-0f1b8f80853973e08,subnet-0640066f35b8f61c1,SecurityGroupIds=sg-0b78d5b8363358dc1,sg-090516498a4837302
```

## Reads
- https://medium.com/@turhan.oz/vanilla-nodejs-mono-repository-with-multiple-aws-lambdas-50914971f11f
- https://www.jeremydaly.com/reuse-database-connections-aws-lambda/
- https://itnext.io/how-to-add-some-caching-in-your-lambdas-without-external-service-aka-stateful-lambdas-1d9c2d4c2083
- https://stackoverflow.com/questions/52019039/how-to-test-aws-lambda-handler-locally-using-nodejs
- https://www.npmjs.com/package/lambda-local

# TODO:

- Playbook/Terraform to deploy the function -->