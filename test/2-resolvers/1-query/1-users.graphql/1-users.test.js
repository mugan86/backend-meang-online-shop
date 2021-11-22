const EasyGraphQLTester = require('easygraphql-tester');
const { it } = require('mocha');

const apiSchema = require('../../../mocks/api-schema');
const resolvers =
  require('./../../../mocks/resolvers/query/users/users').resolverUsersQueries;
const expect = require('chai').expect;

describe('Test Resolvers - Query - user', () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema, resolvers);
  });
  it("'users' - Lista de usuarios", async () => {
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
    const result = await tester.graphql(query, undefined, undefined, {});
    const resultData = result.data.users;
    expect(resultData.status).to.be.a('boolean');
    expect(resultData.message).to.be.a('string');

    const resultDataInfo = resultData.info;
    expect(resultDataInfo).to.be.a('object');
    const keysDataInfo = Object.keys(resultDataInfo);
    keysDataInfo.map((key) => expect(resultDataInfo[key]).to.be.a('number'));

    const resultUsers = resultData.users;
    expect(resultUsers).to.be.a('array');
    expect(resultUsers).to.length.greaterThanOrEqual(0);
    const userKeys = Object.keys(resultUsers[0]);
    userKeys.map((key) => {
      if (key === 'active') {
        expect(resultUsers[0][key]).to.be.a('boolean');
      } else {
        expect(resultUsers[0][key]).to.be.a('string');
        if (key === 'role') {
          // Comprobar si Role es mayúsculas
          expect(resultUsers[0][key]).to.equal(
            resultUsers[0][key].toUpperCase()
          );
          expect(resultUsers[0][key]).to.not.equal(
            resultUsers[0][key].toLowerCase()
          );
        }
      }
    });
  });
  it("'login' - Iniciar sesión - Credenciales correctos", async () => {
    const query = `
    query startSession($email: String!, $password: String!){
      login(email: $email, password: $password) {
        status
        message
        token
      }
    }
          `;
    const result = await tester.graphql(query, undefined, undefined, {
      email: 'mugan86@gmail.com',
      password: '123456',
    });
    const resultData = result.data.login;
    expect(resultData.status).to.be.a('boolean');
    expect(resultData.message).to.be.a('string');
    expect(resultData.token).to.be.a('string');
    expect(resultData.status).to.equal(true);
    expect(resultData.message).to.equal('Usuario cargado correctamente');
    expect(resultData.token.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).to.equal(true);
  });

  it("'login' - Iniciar sesión - Credenciales incorrectos", async () => {
    const query = `
    query startSession($email: String!, $password: String!){
      login(email: $email, password: $password) {
        status
        message
        token
      }
    }
          `;
    const result = await tester.graphql(query, undefined, undefined, {
      email: 'mugan86@gmail.com',
      password: '1234',
    });
    const resultData = result.data.login;
    expect(resultData.status).to.be.a('boolean');
    expect(resultData.message).to.be.a('string');
    expect(resultData.status).to.equal(false);
    expect(resultData.message).to.equal('Password y usuario no son correctos, sesión no iniciada');
    expect(resultData.token).to.equal(null);
  });

  it("'login' - Iniciar sesión - Usuario no existe", async () => {
    const query = `
    query startSession($email: String!, $password: String!){
      login(email: $email, password: $password) {
        status
        message
        token
      }
    }
          `;
    const result = await tester.graphql(query, undefined, undefined, {
      email: '',
      password: '',
    });
    const resultData = result.data.login;
    expect(resultData.status).to.be.a('boolean');
    expect(resultData.message).to.be.a('string');
    expect(resultData.status).to.equal(false);
    expect(resultData.message).to.equal('Usuario no existe');
    expect(resultData.token).to.equal(null);
  });
});
