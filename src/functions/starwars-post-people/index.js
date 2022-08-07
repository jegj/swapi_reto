/* src/functions/starwars-get-people/index.js */

const peopleDAO = require('../../people/peopleDAO');
const peopleMysqlDataSource = require('../../people/peopleMysqlDataSource');

const dtsource = peopleMysqlDataSource(
  process.env.MYSQL_HOST,
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_ROOT_PASSWORD
);

exports.handler = async function _handler(event) {
  let payload;
  if (Object.prototype.hasOwnProperty.call(event, 'body')) {
    payload = JSON.parse(event?.body);
  } else {
    payload = event;
  }
  return peopleDAO(dtsource).post(payload);
};
