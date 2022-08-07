/* src/people/peopleService.js */
const Ajv = require('ajv').default;

const { mapEnglishToSpanish } = require('../libs/utils');
const mapper = require('./peopleMap.json');
const peopleSchema = require('./people.schema.json');

const ajv = new Ajv({ schemas: peopleSchema });

const createPeopleService = (peopleDAO) => Object.freeze({
  getById: async (id) => {
    let response;
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Peticion Invalida. Id es obligatorio'
        })
      };
    }
    const [err, data] = await peopleDAO.getById(id);
    if (err) {
      response = {
        statusCode: err.httpCode,
        body: JSON.stringify({
          message: err.description
        })
      };
    } else if (data !== undefined) {
      response = {
        statusCode: 200,
        body: JSON.stringify(mapEnglishToSpanish(data, mapper))
      };
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Persona no encontrado en la base de datos'
        })
      };
    }
    return response;
  },
  post: async (data) => {
    if (!data || Object.keys(data).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Peticion Invalida. Input para people es olbigatorio'
        })
      };
    }
    let response;
    const validate = ajv.getSchema('postPeople');
    const valid = validate(data);
    if (!valid) {
      response = {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Se encontraron algunos errors en la petición',
          errors: validate.errors
        })
      };
    } else {
      const [err, res] = await peopleDAO.post(data);
      if (err) {
        response = {
          statusCode: err.httpCode,
          body: JSON.stringify({
            message: err.description
          })
        };
      } else {
        response = {
          statusCode: 200,
          body: JSON.stringify(res)
        };
      }
    }
    return response;
  }
});

module.exports = createPeopleService;
