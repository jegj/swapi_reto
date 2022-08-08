/* src/libs/peopleService.spec.js */

const createPeopleService = require('./peopleService');
const { SWError, SWAPI_REQUEST_ERROR } = require('../libs/error');
const { SWAPI_SOURCE } = require('../libs/utils');

let daoMock;
let peopleService;

describe('PeopleService', () => {
  describe('#getById', () => {
    beforeEach(() => {
      daoMock = {
        getById: jest.fn(() => [new SWError(SWAPI_REQUEST_ERROR, 'internal error', SWAPI_SOURCE, 500, true)])
      };
      peopleService = createPeopleService(daoMock);
    });

    test('getById retorna un http error 400 si el id no es valido ', async () => {
      const result = await peopleService.getById(null);
      expect(result).toHaveProperty('statusCode', 400);
      expect(result).toHaveProperty('body');
      expect(JSON.parse(result.body)).toHaveProperty('message');
    });

    test('getById retorna un http error 404 si no se encuentra la persona en la base de dato o la API', async () => {
      daoMock = {
        getById: jest.fn(() => [null, undefined])
      };
      peopleService = createPeopleService(daoMock);
      const result = await peopleService.getById(2);
      expect(result).toHaveProperty('statusCode', 404);
      expect(result).toHaveProperty('body');
      expect(JSON.parse(result.body)).toHaveProperty('message');
    });

    test('getById retorna un http error 500 si el proviene de mysql o axios ', async () => {
      const result = await peopleService.getById(1);
      expect(result).toHaveProperty('statusCode', 500);
      expect(result).toHaveProperty('body');
      expect(JSON.parse(result.body)).toHaveProperty('message');
    });

    test('getById retorna un http error 200 con data proveniente de mysql o axios ', async () => {
      daoMock = {
        getById: jest.fn(() => [null, { nombre: 'Luke' }])
      };
      peopleService = createPeopleService(daoMock);
      const result = await peopleService.getById(1);
      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body');
    });
  });

  describe('#post', () => {
    beforeEach(() => {
      peopleService = createPeopleService(daoMock);
    });

    test('post retorna un http error 400 si la data no es valida ', async () => {
      const result = await peopleService.post(null);
      expect(result).toHaveProperty('statusCode', 400);
      expect(result).toHaveProperty('body');
      expect(JSON.parse(result.body)).toHaveProperty('message');
    });

    test('post retorna un http error 400 si la data no es valida segun el esquema ', async () => {
      const result = await peopleService.post({ randomdata: true, fake: true });
      expect(result).toHaveProperty('statusCode', 400);
      expect(result).toHaveProperty('body');
      expect(JSON.parse(result.body)).toHaveProperty('errors');
    });

    test('post retorna http OK si la data es valida segun el esquema ', async () => {
      const validData = {
        nombre: 'Wilhuff Tarkin',
        altura: '180',
        peso: 'unknown',
        color_pelo: 'auburn, grey',
        color_piel: 'fair',
        color_ojos: 'blue',
        nacimiento: '64BBY',
        genero: 'male',
        planeta_origen: 'https://swapi.py4e.com/api/planets/21/',
        peliculas: [
          'https://swapi.py4e.com/api/films/1/',
          'https://swapi.py4e.com/api/films/6/'
        ],
        especies: [
          'https://swapi.py4e.com/api/species/1/'
        ],
        vehiculos: [],
        naves: [],
        swapi_creacion: '2014-12-10T16:26:56.138000Z',
        swapi_edicion: '2014-12-20T21:17:50.330000Z',
        url: 'https://swapi.py4e.com/api/people/12/',
        id: 12
      };
      daoMock = {
        post: jest.fn(() => [null, { id: 12 }])
      };
      peopleService = createPeopleService(daoMock);
      const result = await peopleService.post(validData);
      expect(result).toHaveProperty('statusCode', 200);
      expect(result).toHaveProperty('body');
      expect(JSON.parse(result.body)).toHaveProperty('id');
    });
  });
});
