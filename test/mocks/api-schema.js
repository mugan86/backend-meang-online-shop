const path = require('path');
const mergeGraphQLSchemas = require('merge-graphql-schemas');

const fileLoader = mergeGraphQLSchemas.fileLoader;
const mergeTypes = mergeGraphQLSchemas.mergeTypes; 

const typesArray = fileLoader(path.join(__dirname, `../../src/schema/**/*.graphql`));

module.exports = mergeTypes(typesArray, { all: true });