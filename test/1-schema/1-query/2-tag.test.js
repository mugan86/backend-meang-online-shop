const EasyGraphQLTester = require('easygraphql-tester');
const { it } = require('mocha');

const apiSchema = require('../../mocks/api-schema');

// const tester =
describe('Test Schema GraphQL - Query - tag.graphql', () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema);
  });
  it("'tags' válida - Sin usar Query Variables", () => {
    const query = `
    {
      tags {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        tags {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(true, query, {});
  });
  it("'tags' válida - Usando Query Variables - Paginación - Página", () => {
    const query = `
    query tagsList($page: Int){
      tags(page: $page) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        tags {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(true, query, { page: 5});
  });
  it("'tags' válida - Usando Query Variables - Paginación - Página, Items Página, Activo", () => {
    const query = `
    query tagsList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
      tags(page: $page, itemsPage: $itemsPage, active: $active) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        tags {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(true, query, {page: 2, active: 'ALL', itemsPage: 4});
  });
  it("'tags' inválida", () => {
    const query = `
    {
      tags {
        id
        name
        slug
        active
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'tags' inválida - Usando Query Variables - Pasando argumento active incorrecto", () => {
    const query = `
    query tagsList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
      tags(page: $page, itemsPage: $itemsPage, active: $active) {
        info {
          page
          total
          itemsPage
          pages
        }
        status
        message
        tags {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(false, query, {page: 2, active: 'ALLLL', itemsPage: 4});
  });
  it("'tag' válida - Seleccionado elemento con id", () => {
    const query = `
    query tagSelect($id: ID!){
      tag (id: $id){
        status
        message
        tag {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(true, query, {id: '1'});
  });
  it("'tag' inválida - Seleccionado elemento con id - No recoger el valor en definición", () => {
    const query = `
    query tagSelect($id: ID!){
      tag {
        status
        message
        tag {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(false, query, {id: '1'});
  });
  it("'tag' inválida - Seleccionado elemento con id - Sin pasar valor Query Variable", () => {
    const query = `
    query tagSelect($id: ID!){
      tag (id: $id){
        status
        message
        tag {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'tag' inválida - Sin usar Query Variables", () => {
    const query = `
    {
      tag {
        status
        message
        tag {
          id
          name
          slug
          active
        }
      }
    }
          `;
    tester.test(false, query, {});
  });
});
