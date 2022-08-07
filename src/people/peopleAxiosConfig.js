/* src/people/peopleAxiosConfig.js */

const getConfig = (baseURL) => ({
  method: 'get',
  url: '/people/',
  baseURL,
  headers: {
    Accept: 'application/json'
  }
});

module.exports = getConfig;
