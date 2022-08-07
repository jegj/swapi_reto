/* src/libs/error.spec.js */

const { SWError, GENERIC_ERROR, handleSourceError } = require('./error');
const { INTERNAL_SOURCE } = require('./utils');

describe('Error test suite', () => {
  describe('#SWError', () => {
    test('SWError tiene  ', async () => {
      const error = new SWError(GENERIC_ERROR, 'Error generico', 'invalid_source');
      expect(error).toBeInstanceOf(Error);
    });

    test('SWError tiene INTERNAL_SOURCE como source por defecto', async () => {
      const error = new SWError(GENERIC_ERROR, 'Error generico', INTERNAL_SOURCE);
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('source', INTERNAL_SOURCE);
    });

    test('SWError tiene external como falso por defecto', async () => {
      const error = new SWError(GENERIC_ERROR, 'Error generico', INTERNAL_SOURCE);
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('external', false);
    });
  });
  describe('#handleSourceError', () => {
    test('handleSourceError retorna un SWError siempre', async () => {
      const error = handleSourceError(GENERIC_ERROR, INTERNAL_SOURCE, new Error('generic error'));
      expect(error).toBeInstanceOf(SWError);
    });

    test('handleSourceError tiene informacion referente a respuesta http si el error original viene de llamada externas de axios', async () => {
      const err = new Error('generic error');
      err.response = {
        status: 503,
        statusText: 'Service unavailable'
      };
      const error = handleSourceError(GENERIC_ERROR, INTERNAL_SOURCE, err);
      expect(error).toBeInstanceOf(SWError);
      expect(error).toHaveProperty('httpCode', err.response.status);
    });

    test('handleSourceError tiene informacion referente a peticion http si el error original viene de llamada externas de axios', async () => {
      const err = new Error('generic error');
      err.request = {
        statusText: 'Axios request error'
      };
      const error = handleSourceError(GENERIC_ERROR, INTERNAL_SOURCE, err);
      expect(error).toBeInstanceOf(SWError);
      expect(error).toHaveProperty('httpCode', 500);
    });
  });
});
