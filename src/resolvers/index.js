import pkg from 'lodash';

import categories from './Category/index.js';
import user from './User/index.js';

const { _ } = pkg;

const resolvers = _.merge(
    user,
    categories
);
export default resolvers;