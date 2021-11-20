const EasyGraphQLTester = require('easygraphql-tester');
const { it } = require('mocha');

const apiSchema = require('./../../mocks/api-schema');

// const tester =
describe('Test Schema GraphQL - Query - user.graphql', () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema);
  });
  it("'users' válida - Sin usar Query Variables", () => {
    const query = `
    {
      users {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        users {
          id
          name
          lastname
          email
          password
          registerDate
          birthday
          role
          active
          stripeCustomer
        }
      }
    }
          `;
    tester.test(true, query, {});
  });
  it("'users' válida - Usando Query Variables - Paginación - Página", () => {
    const query = `
    query usersLis($page: Int){
      users(page: $page) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        users {
          id
          name
          lastname
          email
          password
          registerDate
          birthday
          role
          active
          stripeCustomer
        }
      }
    }
          `;
    tester.test(true, query, { page: 5});
  });
  it("'users' válida - Usando Query Variables - Paginación - Página, Items Página, Activo", () => {
    const query = `
    query usersList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
      users(page: $page, itemsPage: $itemsPage, active: $active) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        users {
          id
          name
          lastname
          email
          password
          registerDate
          birthday
          role
          active
          stripeCustomer
        }
      }
    }
          `;
    tester.test(true, query, {page: 2, active: 'ALL', itemsPage: 4});
  });
  it("'users' inválida", () => {
    const query = `
    {
      users {
        id
        name
        lastname
        email
        password
        registerDate
        birthday
        role
        active
        stripeCustomer
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'users' inválida - Usando Query Variables - Pasando argumento active incorrecto", () => {
    const query = `
    query usersList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
      users(page: $page, itemsPage: $itemsPage, active: $active) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        users {
          id
          name
          lastname
          email
          password
          registerDate
          birthday
          role
          active
          stripeCustomer
        }
      }
    }
          `;
    tester.test(false, query, {page: 2, active: 'ALLLL', itemsPage: 4});
  });
  it("'login' válida", () => {
    const query = `
    query loginQuery($email:String!, $password: String!){
      login  (email:$email, password: $password){
        status
        message
        token
      }
    }
          `;
    tester.test(true, query, { email: 'mugan86@gmail.com', password: '1234' });
  });
  it("'login' inválida - Sin Password en Query Variables", () => {
    const query = `
    query loginQuery($email:String!, $password: String!){
      login  (email:$email, password: $password){
        status
        message
        token
      }
    }
          `;
    tester.test(false, query, { email: 'mugan86@gmail.com' });
  });
  it("'login' inválida - Sin Email, Password en Query Variables", () => {
    const query = `
    query loginQuery($email:String!, $password: String!){
      login  (email:$email, password: $password){
        status
        message
        token
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'login' inválida - Sin Email, Password en Argumentos de la operación", () => {
    const query = `
    {
      login {
        status
        message
        token
      }
    }
          `;
    tester.test(false, query, {email: 'mugan86@gmail.com', password: '1234'});
  });
  it("'me' válida", () => {
    const query = `
    {
      me {
        status
        message
        user {
          name
          lastname
        }
      }
    }
          `;
    tester.test(true, query, {});
  });

  it("'me' inválida - Añadiendo 'token' en vez de 'user'", () => {
    const query = `
    {
      me {
        status
        message
        token {
          name
          lastname
        }
      }
    }
          `;
    tester.test(false, query, {});
  });
});
