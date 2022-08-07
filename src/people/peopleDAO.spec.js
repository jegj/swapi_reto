/* src/DAO/people.spec.js */
const axios = require('axios');

const createPeopleDAO = require('./peopleDAO');
const peopleAxiosDataSource = require('./peopleAxiosDataSource');
const { SWError } = require('../libs/error');

jest.mock('axios');

let peopleDAO;

describe('PeopleDAO(Axios)', () => {
  describe('#getById', () => {
    beforeEach(() => {
      peopleDAO = createPeopleDAO(peopleAxiosDataSource());
    });

    test('getById retorna BadRequest si el id no es valido ', async () => {
      const result = await peopleDAO.getById(null);
      expect(result).toBeArrayOfSize(1);
      expect(result[0]).toBeInstanceOf(SWError);
    });

    test('getById retorna Success si el id es valido y devuelve un JSON valido', async () => {
      axios.mockResolvedValue({ status: 200, data: { name: 'Luke Skywalker' } });
      const result = await peopleDAO.getById(1);
      expect(result).toBeArrayOfSize(2);
      expect(result[0]).toBe(null);
      expect(result[1]).toEqual({ name: 'Luke Skywalker' });
    });

    test('getById retorna 500 si hay un error en la API externa', async () => {
      const error = new Error('Internal server error');
      error.response = { status: 500, statusText: 'Internal server error' };
      axios.mockRejectedValueOnce(error);
      const result = await peopleDAO.getById(1);
      expect(result).toBeArrayOfSize(1);
      expect(result[0]).toBeInstanceOf(SWError);
    });
  });
});
