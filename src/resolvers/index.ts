import path from 'path';
import { mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ['ts', 'js'],
});

if (process.env.NODE_ENV !== 'production') {
  console.log(resolversArray);
}

export default mergeResolvers(resolversArray);
