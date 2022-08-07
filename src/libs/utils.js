/* eslint-disable security/detect-object-injection */
/* src/libs/index.js */

const SWAPI_SOURCE = 'swapi';
const INTERNAL_SOURCE = 'internal';

const VALID_SOURCES = [SWAPI_SOURCE, INTERNAL_SOURCE];

const getValidSource = (source) => (VALID_SOURCES.indexOf(source) >= 0 ? source : INTERNAL_SOURCE);

const mapEnglishToSpanish = (entity, langDestination) => {
  const nentity = {};
  Object.keys(entity).forEach((key) => {
    if ((Object.prototype.hasOwnProperty.call(langDestination, key))) {
      nentity[langDestination[key]] = entity[key];
    } else {
      nentity[key] = entity[key];
    }
  });

  return nentity;
};

module.exports = {
  getValidSource,
  SWAPI_SOURCE,
  INTERNAL_SOURCE,
  mapEnglishToSpanish
};
