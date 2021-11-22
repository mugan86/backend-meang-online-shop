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

const login = (_, args) => {
  const email = args.email;
  const password = args.password;
  if (email === '' || email === null) {
    return {
      status: false,
      message: 'Usuario no existe',
      token: null,
    };
  }
  if (email === 'mugan86@gmail.com' && password === '123456') {
    return {
      status: true,
      message: 'Usuario cargado correctamente',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlOGVmYzA3MmQ1MTI1MDlmZmY3ZTg1YyIsIm5hbWUiOiJBbmFydHoiLCJsYXN0bmFtZSI6Ik11Z2lrYSBMZWRvIiwiZW1haWwiOiJtdWdhbjg2QGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlkIjoiMSIsImFjdGl2ZSI6ZmFsc2UsInN0cmlwZUN1c3RvbWVyIjoiY3VzX0hhZmZKUXJsT1pxYnFBIn0sImlhdCI6MTYzNzU4ODI1NSwiZXhwIjoxNjM3Njc0NjU1fQ.haueIFJEN45njp8dl6diEKT3Ls1shqbCs-bp6tVXeTI',
    };
  }
  return {
    status: false,
    message: 'Password y usuario no son correctos, sesión no iniciada',
    token: null
  };
    
};

const resolverUsersQueries = {
  Query: {
    users,
    login
  },
};

module.exports = {
  resolverUsersQueries,
};
