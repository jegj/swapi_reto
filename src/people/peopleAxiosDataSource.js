/* src/people/peopleInDataSource.js */
const axios = require('axios');

const { SWAPI_SOURCE } = require('../libs/utils');
const { SWAPI_REQUEST_ERROR, handleSourceError } = require('../libs/error');
const getConfig = require('./peopleAxiosConfig');

const peopleAxiosDataSource = (axiosConfig = getConfig()) => Object.freeze({

  getById: async (id) => {
    let config;
    let body;
    let response;
    try {
      if (!id) {
        const err = new Error('id es un parametro obligatorio');
        err.response = {
          status: 400,
          statusText: 'Bad request'
        };
        throw err;
      }

      config = {
        ...axiosConfig,
        ...{ method: 'get', url: `/people/${id}` }
      };

      body = await axios(config);
      response = [null, { ...body.data, ...{ id: parseInt(id, 10) } }];
    } catch (error) {
      response = [handleSourceError(SWAPI_REQUEST_ERROR, SWAPI_SOURCE, error)];
    }
    return response;
  }

});

module.exports = peopleAxiosDataSource;
