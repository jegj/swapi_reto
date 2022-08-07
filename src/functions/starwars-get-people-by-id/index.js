/* src/functions/starwars-get-people/index.js */

const peopleDAO = require('../../people/peopleDAO');
const peopleService = require('../../people/peopleService');
const getConfig = require('../../people/peopleAxiosConfig');
const peopleAxiosDataSource = require('../../people/peopleAxiosDataSource');

const dtsource = peopleAxiosDataSource(getConfig(process.env.SWAPI_API));

const pservice = peopleService(peopleDAO(dtsource));

exports.handler = async function _handler(event) {
  // console.log(event);
  const id = event?.pathParameters?.id;
  return pservice.getById(id);
};
