/* src/libs/index.spec.js */

const {
  getValidSource,
  INTERNAL_SOURCE, SWAPI_SOURCE,
  mapEnglishToSpanish
} = require('./utils');
const mapper = require('../people/peopleMap.json');

describe('Libs utils test suite', () => {
  describe('#getValidSource', () => {
    test('getValidSource retorna swapi como fuente por default', async () => {
      expect(getValidSource('random')).toBe(INTERNAL_SOURCE);
      expect(getValidSource(null)).toBe(INTERNAL_SOURCE);
      expect(getValidSource(undefined)).toBe(INTERNAL_SOURCE);
      expect(getValidSource(1)).toBe(INTERNAL_SOURCE);
    });

    test('getValidSource retorna una fuente valida siempre', async () => {
      expect(getValidSource('swapi')).toBe(SWAPI_SOURCE);
      expect(getValidSource('db')).toBe(INTERNAL_SOURCE);
    });
  });

  describe('#mapEnglishToSpanish', () => {
    test('mapEnglishToSpanish retorna el mismo objeto si las propiedades ya estan en español', () => {
      const testObject = { nombre: 'Luke', altura: 177 };
      const nobject = mapEnglishToSpanish(testObject, mapper);

      expect(nobject).toHaveProperty('nombre', testObject.nombre);
    });
    test('mapEnglishToSpanish retorna un nuevo objeto con propiedades nuevas en base al object Mapper', () => {
      const testObject = { name: 'Luke', height: 177 };
      const nobject = mapEnglishToSpanish(testObject, mapper);

      expect(nobject).toHaveProperty('nombre', testObject.name);
      expect(nobject).toHaveProperty('altura', testObject.height);
    });

    test('mapEnglishToSpanish retorna la misma propiedad si no hay una asociacion', () => {
      const testObject = { name: 'Luke', height: 177, random: true };
      const nobject = mapEnglishToSpanish(testObject, mapper);

      expect(nobject).toHaveProperty('nombre', testObject.name);
      expect(nobject).toHaveProperty('altura', testObject.height);
      expect(nobject).toHaveProperty('random', testObject.random);
    });
  });
});
