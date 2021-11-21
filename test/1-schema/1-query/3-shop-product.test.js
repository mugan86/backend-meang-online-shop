const EasyGraphQLTester = require('easygraphql-tester');
const { it } = require('mocha');

const apiSchema = require('../../mocks/api-schema');

// const tester =
describe('Test Schema GraphQL - Query - shop-product.graphql', () => {
  let tester;
  before(function () {
    tester = new EasyGraphQLTester(apiSchema);
  });
  it("'shopProducts' válida - Sin usar Query Variables", () => {
    const query = `
    {
      shopProducts {
        status
        message
        info {
          page
          pages
          itemsPage
          total
        }
        shopProducts {
          id
          productId
          product {
            name
            clip {
              clips {
                low
                full
                medium
              }
              preview
            }
            id
            released
            screenshoot
          }
          price
        }
      }
    }
          `;
    tester.test(true, query, {});
  });
  it("'shopProducts' válida - Usando Query Variables - Paginación - Página", () => {
    const query = `
    query shoProductsList($page: Int){
        shopProducts(page: $page) {
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(true, query, { page: 5 });
  });
  it("'shoProducts' válida - Usando Query Variables - Paginación - Página, Items Página, Activo", () => {
    const query = `
    query shopProductsList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
        shopProducts (page: $page, itemsPage: $itemsPage, active: $active){
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(true, query, { page: 2, active: 'ALL', itemsPage: 4 });
  });
  it("'shopProducts' inválida", () => {
    const query = `
    {
      shopProducts {
        id
        name
        slug
        product {
          name
          released
        }
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'shopProducts' inválida - Usando Query Variables - Pasando argumento active incorrecto", () => {
    const query = `
    query shopProductsList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
        shopProducts (page: $page, itemsPage: $itemsPage, active: $active){
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(false, query, { page: 2, active: 'ALLLL', itemsPage: 4 });
  });
  it("'shopProductsPlatforms' válida . Solo Query Variables obligatorias", () => {
    const query = `
    query shopProductsList($platform: [ID!]!){
        shopProductsPlatforms(platform: $platform) {
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(true, query, { platform: ['1'] });
  });
  it("'shopProductsPlatforms' válida - Usando Query Variables - Paginación - Página", () => {
    const query = `
    query shoProductsList($page: Int, $platform: [ID!]!){
        shopProductsPlatforms(page: $page, platform: $platform) {
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(true, query, { page: 5, platform: ['1'] });
  });
  it("'shopProductsPlatforms' válida - Usando Query Variables - Paginación - Página, Items Página, Activo", () => {
    const query = `
    query shopProductsList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum, $platform: [ID!]!){
        shopProductsPlatforms (page: $page, itemsPage: $itemsPage, active: $active, platform: $platform){
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(true, query, {
      page: 2,
      active: 'ALL',
      itemsPage: 4,
      platform: ['1'],
    });
  });
  it("'shopProductsPlatforms' inválida", () => {
    const query = `
    {
      shopProductsPlatforms {
        id
        name
        slug
        product {
          name
          released
        }
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'shopProductsPlatforms' inválida - Usando Query Variables - Pasando argumento active incorrecto", () => {
    const query = `
    query shopProductsList($page: Int, $itemsPage: Int, $active: ActiveFilterEnum){
        shopProductsPlatforms (page: $page, itemsPage: $itemsPage, active: $active){
          status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProducts {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
        }
    }
          `;
    tester.test(false, query, { page: 2, active: 'ALLLL', itemsPage: 4 });
  });
  it("'shopProductDetails' válida - Seleccionado elemento con id", () => {
    const query = `
    query shopProductDetails($id: Int!){
      shopProductDetails (id: $id){
        status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProduct {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
      }
    }
          `;
    tester.test(true, query, { id: 1 });
  });
  it("'shopProductDetails' inválida - Seleccionado elemento con id - No recoger el valor en definición", () => {
    const query = `
    query shopProductsItem($id: Int!){
      shopProductDetails{
        status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProduct {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
      }
    }
          `;
    tester.test(false, query, { id: 1 });
  });
  it("'shopProductDetails' inválida - Seleccionado elemento con id - Sin pasar valor Query Variable", () => {
    const query = `
    query shopProductsItem($id: Int!){
      shopProductDetails (id: $id){
        status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProduct {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
      }
    }
          `;
    tester.test(false, query, {});
  });
  it("'shopProductDetails' inválida - Sin usar Query Variables", () => {
    const query = `
    {
      shopProductDetails{
        status
          message
          info {
            page
            pages
            itemsPage
            total
          }
          shopProduct {
            id
            productId
            product {
              name
              clip {
                clips {
                  low
                  full
                  medium
                }
                preview
              }
              id
              released
              screenshoot
            }
            price
          }
      }
    }
          `;
    tester.test(false, query, {});
  });
});
