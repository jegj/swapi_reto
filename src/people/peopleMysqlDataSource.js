/* src/people/peopleMysqlDataSource.js */
const mysql = require('mysql');

const { INTERNAL_SOURCE } = require('../libs/utils');
const { DATABASE_ERROR, handleSourceError } = require('../libs/error');

const peopleMysqlDataSource = (host, user, password, database, port, connectionLimit = 10) => {
  const pool = mysql.createPool({
    connectionLimit,
    host,
    user,
    password,
    database,
    port
  });

  return (Object.freeze({

    getById: async (id) => {
      let response;
      try {
        const queryWrapper = () => {
          const query = `
            SELECT json_object(
              'nombre', people.nombre,
              'id', people.id,
              'nombre', people.nombre,
              'altura', people.altura,
              'peso', people.peso,
              'color_pelo', people.color_pelo,
              'color_piel', people.color_piel,
              'color_ojo', people.color_ojo,
              'nacimiento', people.nacimiento,
              'genero', people.genero,
              'planeta_origen', people.planeta_origen,
              'peliculas', people.peliculas,
              'especies', people.especies,
              'vehiculos', people.vehiculos,
              'naves', people.naves,
              'swapi_creacion', people.swapi_creacion,
              'swapi_edicion', people.swapi_edicion,
              'url', people.url
            ) AS persona FROM people WHERE id = ?
          `;
          return new Promise((resolve, reject) => {
            pool.query(query, [id], (error, elements) => {
              if (error) {
                return reject(error);
              }
              return resolve(elements[0]?.persona);
            });
          });
        };
        const res = await queryWrapper();
        response = [null, JSON.parse(res)];
      } catch (error) {
        response = [handleSourceError(DATABASE_ERROR, INTERNAL_SOURCE, error)];
      }
      return response;
    },
    post: async (data) => {
      let response;
      try {
        const queryWrapper = () => {
          const params = {
            id: data.id,
            nombre: data.nombre,
            altura: data.altura,
            peso: data.peso,
            color_pelo: data.color_pelo,
            color_piel: data.color_piel,
            color_ojo: data.color_ojo,
            nacimiento: data.nacimiento,
            genero: data.genero,
            planeta_origen: data.planeta_origen,
            peliculas: JSON.stringify(data.peliculas),
            especies: JSON.stringify(data.especies),
            vehiculos: JSON.stringify(data.vehiculos),
            naves: JSON.stringify(data.naves),
            swapi_creacion: data.swapi_creacion,
            swapi_edicion: data.swapi_edicion,
            url: data.url
          };
          const query = `
            INSERT INTO swapi.people SET ?
          `;
          return new Promise((resolve, reject) => {
            pool.query(query, params, (error, elements) => {
              if (error) {
                return reject(error);
              }
              return resolve(elements);
            });
          });
        };
        await queryWrapper();
        response = [null, { id: data.id }];
      } catch (error) {
        response = [handleSourceError(DATABASE_ERROR, INTERNAL_SOURCE, error)];
      }
      return response;
    }
  }));
};

module.exports = peopleMysqlDataSource;
