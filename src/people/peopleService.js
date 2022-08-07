/* src/people/peopleService.js */
const { mapEnglishToSpanish } = require('../libs/utils');
const mapper = require('./peopleMap.json');

const createPeopleService = (peopleDAO) => Object.freeze({
  getById: async (id) => {
    if (!id) {
      return {
        statusCode: 400,
        message: 'Peticion Invalida. Id es olbigatorio'
      };
    }
    let response;
    const [err, data] = await peopleDAO.getById(id);
    if (err) {
      response = {
        statusCode: err.httpCode,
        message: err.message
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify(mapEnglishToSpanish(data, mapper))
      };
    }
    return response;
  }
  // post: async (data) => {

  // }
});

module.exports = createPeopleService;
