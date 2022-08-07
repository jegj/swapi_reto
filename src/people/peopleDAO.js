const createPeopleDAO = (people) => Object.freeze({
  getById: async (id) => people.getById(id),
  post: async (data) => people.post(data)
});

module.exports = createPeopleDAO;
