/* src/functions/starwars-get-people/index.js */

const peopleDAO = require('../../people/peopleDAO');
const peopleService = require('../../people/peopleService');
const getConfig = require('../../people/peopleAxiosConfig');
const peopleAxiosDataSource = require('../../people/peopleAxiosDataSource');
const peopleMysqlDataSource = require('../../people/peopleMysqlDataSource');
const { getValidSource, SWAPI_SOURCE } = require('../../libs/utils');

const dtAxiosSource = peopleAxiosDataSource(getConfig(process.env.SWAPI_API));
const pAxiosService = peopleService(peopleDAO(dtAxiosSource));

const dtMysqlSource = peopleMysqlDataSource(
  process.env.MYSQL_HOST,
  process.env.MYSQL_USER,
  process.env.MYSQL_ROOT_PASSWORD,
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_TCP_PORT
);
const pMysqlService = peopleService(peopleDAO(dtMysqlSource));

exports.handler = async function _handler(event) {
  const id = event?.pathParameters?.id;
  const source = getValidSource(event?.queryStringParameters?.source);
  if (source === SWAPI_SOURCE) {
    console.info('Usando swapi como fuente...');
    return pAxiosService.getById(id);
  }

  console.info('Usando mysql como fuente...');
  return pMysqlService.getById(id);
};
