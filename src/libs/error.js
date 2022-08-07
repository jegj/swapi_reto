/* src/libs/error.js */

const GENERIC_ERROR = 'GenericSWError';
const DATABASE_ERROR = 'DatabaseSWError';
const SWAPI_REQUEST_ERROR = 'SwapiRequestError';

const { getValidSource } = require('./utils');

/**
 * Builtin Error
 */
class SWError extends Error {
  constructor(name, description, source, httpCode = null, external = false) {
    super();
    this.name = name;
    this.source = getValidSource(source);
    this.httpCode = httpCode;
    this.external = external;
    this.description = description;
  }
}

/**
 * Wrapper para formatear el error de axios
 * @param {Error} err AxiosErro
 * @returns Object {
    response,
    status,
    external,
    message
  }
 */
const handleSourceError = (name, source, err) => {
  let status;
  let message;
  let external = false;

  if (err.response) {
    status = err?.response?.status ?? 500;
    message = err?.response?.statusText ?? 'Server responed with an error';
    external = true;
  } else if (err.request) {
    message = 'Request error';
    external = false;
    status = 500;
  } else {
    message = err?.message;
    external = false;
    status = 500;
  }
  return new SWError(name, message, source, status, external);
};

module.exports = {
  GENERIC_ERROR,
  SWAPI_REQUEST_ERROR,
  SWError,
  handleSourceError,
  DATABASE_ERROR
};
