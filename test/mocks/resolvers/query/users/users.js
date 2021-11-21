const users = () => {
  return {
    info: {
      page: 1,
      total: 151,
      itemsPage: 1,
      pages: 151,
    },
    status: true,
    message: 'Lista de usuarios correctamente cargada',
    users: [
      {
        id: '3',
        name: 'Gamezonia',
        lastname: 'Online Shop',
        email: 'gamezonia.online.shop@gmail.com',
        password:
          '$2b$10$0gMh7faJDUYQZgrKbBvwq.yKG38u4iLUEw52DE6/QHdP2NvVJ.d3G',
        registerDate: '2020-06-05T09:25:10.702Z',
        birthday: '2020-06-05T09:25:10.671Z',
        role: 'ADMIN',
        active: true,
        stripeCustomer: 'cus_HZXuACbn5dQ3Pm',
      },
    ],
  };
};

const helloWithName = (_, args) => {
  return `Hello ${args.name}!!`;
};

const helloToGraphQLCourse = () => {
  return 'Hello to GraphQL Course!!';
};

const resolverUsersQueries = {
  Query: {
    users,
  },
};

module.exports = {
  resolverUsersQueries,
};
