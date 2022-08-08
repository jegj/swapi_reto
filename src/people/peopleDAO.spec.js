/* src/DAO/people.spec.js */
const axios = require('axios');

const createPeopleDAO = require('./peopleDAO');
const peopleAxiosDataSource = require('./peopleAxiosDataSource');
const { SWError, DATABASE_ERROR } = require('../libs/error');
const { INTERNAL_SOURCE } = require('../libs/utils');

jest.mock('axios');

let peopleDAO;
let dsourceMock;

describe('PeopleDAO', () => {
  describe('Axios', () => {
    describe('#getById', () => {
      beforeEach(() => {
        peopleDAO = createPeopleDAO(peopleAxiosDataSource());
      });

      test('getById retorna un error si el id no es valido ', async () => {
        const result = await peopleDAO.getById(null);
        expect(result).toBeArrayOfSize(1);
        expect(result[0]).toBeInstanceOf(SWError);
      });

      test('getById retorna data si el id es valido y devuelve un JSON valido', async () => {
        axios.mockResolvedValue({ status: 200, data: { name: 'Luke Skywalker' } });
        const result = await peopleDAO.getById(1);
        expect(result).toBeArrayOfSize(2);
        expect(result[0]).toBe(null);
        expect(result[1]).toEqual({ name: 'Luke Skywalker', id: 1 });
      });

      test('getById retorna un error si hay un error en la API externa', async () => {
        const error = new Error('Internal server error');
        error.response = { status: 500, statusText: 'Internal server error' };
        axios.mockRejectedValueOnce(error);
        const result = await peopleDAO.getById(1);
        expect(result).toBeArrayOfSize(1);
        expect(result[0]).toBeInstanceOf(SWError);
      });
    });
  });
  describe('Mysql', () => {
    describe('#getById', () => {
      beforeEach(() => {
        dsourceMock = {
          getById: jest.fn(() => [new SWError(DATABASE_ERROR, 'Database error', INTERNAL_SOURCE, 500, true)])
        };
        peopleDAO = createPeopleDAO(dsourceMock);
      });

      test('getById retorna un error si el id no es valido ', async () => {
        const result = await peopleDAO.getById(null);
        expect(result).toBeArrayOfSize(1);
        expect(result[0]).toBeInstanceOf(SWError);
      });

      test('getById retorna data si el id es valido y devuelve un JSON valido( sin el id)', async () => {
        dsourceMock = {
          getById: jest.fn(() => [null, { name: 'Luke Skywalker' }])
        };
        peopleDAO = createPeopleDAO(dsourceMock);
        const result = await peopleDAO.getById(1);
        expect(result).toBeArrayOfSize(2);
        expect(result[0]).toBe(null);
        expect(result[1]).toEqual({ name: 'Luke Skywalker' });
      });

      test('getById retorna un error si hay un error en la base de datos', async () => {
        const result = await peopleDAO.getById(1);
        expect(result).toBeArrayOfSize(1);
        expect(result[0]).toBeInstanceOf(SWError);
      });
    });

    describe('#post', () => {
      beforeEach(() => {
        dsourceMock = {
          post: jest.fn(() => [new SWError(DATABASE_ERROR, 'Database error', INTERNAL_SOURCE, 500, true)])
        };
        peopleDAO = createPeopleDAO(dsourceMock);
      });

      test('post retorna un error si el body no es valido ', async () => {
        const result = await peopleDAO.post(null);
        expect(result).toBeArrayOfSize(1);
        expect(result[0]).toBeInstanceOf(SWError);
      });

      test('post retorna data si el body es valido y devuelve un JSON valido( sin el id)', async () => {
        dsourceMock = {
          post: jest.fn(() => [null, { id: 1 }])
        };
        peopleDAO = createPeopleDAO(dsourceMock);
        const result = await peopleDAO.post({ name: 'Luke Skywalker' });
        expect(result).toBeArrayOfSize(2);
        expect(result[0]).toBe(null);
        expect(result[1]).toEqual({ id: 1 });
      });

      test('post retorna un error si hay un error en la base de datos', async () => {
        const result = await peopleDAO.post(1);
        expect(result).toBeArrayOfSize(1);
        expect(result[0]).toBeInstanceOf(SWError);
      });
    });
  });
});
