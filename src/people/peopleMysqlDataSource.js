/* src/people/peopleInDataSource.js */
const axios = require('axios');

const { handleAxiosError } = require('../libs/utils');
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
          statusText: 'Bad request. Id es requirido'
        };
        throw err;
      }

      config = {
        ...axiosConfig,
        ...{ method: 'get', url: `/people/${id}` }
      };

      body = await axios(config);
      response = {
        statusCode: 200,
        body: JSON.stringify(body.data)
      };
    } catch (error) {
      const { status, message } = handleAxiosError(error);
      response = {
        statusCode: status,
        message
      };
    }
    return response;
  }

});

module.exports = peopleAxiosDataSource;
