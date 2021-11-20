const EasyGraphQLTester = require('easygraphql-tester');
const { it } = require('mocha');

const apiSchema = require('./../../mocks/api-schema');

// const tester =
describe('Test Schema GraphQL - Query - user.graphql', () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema);
  });
  it("Llamada 'users' válida", () => {
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
  it("Llamada 'users' inválida", () => {
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
  it("Llamada 'login' válida", () => {
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
  it("Llamada 'login' inválida - Sin Password en Query Variables", () => {
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
  it("Llamada 'login' inválida - Sin Email, Password en Query Variables", () => {
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
  it("Llamada 'login' inválida - Sin Email, Password en Argumentos de la operación", () => {
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
  it("Llamada 'me' válida", () => {
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

  it("Llamada 'me' inválida - Añadiendo 'token' en vez de 'user'", () => {
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
