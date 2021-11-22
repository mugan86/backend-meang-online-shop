const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

module.exports = mergeTypeDefs(loadFilesSync(path.join(__dirname, './../../src/schema/**/*.graphql')));