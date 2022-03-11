import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcryptjspkg from 'bcryptjs';
import jsonWebTokenPkg from 'jsonwebtoken';
import resolvers from './resolvers/index.js';
import utils from './utils.js';

const typeDefs = await loadSchema('./src/schema/types/*.graphql', {
    // load files and merge them into a single schema object
    loaders: [new GraphQLFileLoader()]
});

const { APP_SECRET, getUserId } = utils;

const bcrypt = bcryptjspkg;

const jwt = jsonWebTokenPkg;


/*
export const resolvers = {
    Query: {
        books: () => books,
        getCategory: async (parent, args, context, info) => {
            let users = await context.db.category.findMany({
                where: {
                    NOT: {
                        id: 1
                    }
                }
            });
            return users;
        },
        users: async (parent, args, context, info) => {
            let users = await context.db.user.findMany();
            return users;
        },
    },
    Mutation: {
        updateUserEmail: async (parent, args, context, info) => {
            let { id, email } = args;
            let users = await context.db.user.update({
                where: {
                    id: id
                },
                data: {
                    email: email
                }
            });
            return users;
        },
        signup: async (parent, args, context, info) => {
            let { email, name, password } = args;
            let user = await context.db.user.findUnique({
                where: {
                    email: email
                }
            });
            if (user) {
                throw new Error('Email is invalid or already taken');
            }
            password = await bcrypt.hash(password, 10);
            user = await context.db.user.create({
                data: {
                    email: email,
                    name: name,
                    password: password
                }
            });
            let token = jwt.sign({ userId: user.id }, APP_SECRET);
            return { token, user };
        },
        signin: async (parent, args, context, info) => {
            let { email, name, password } = args;
            // find user
            let user = await context.db.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error('No such user found');
            }
            // password check
            let valid = await bcrypt.compare(args.password, user.password);
            if (!valid) {
                throw new Error('Incorrect username or password.');
            }
            // generate token
            let token = jwt.sign({ userId: user.id }, APP_SECRET);
            return { token, user };
        },
    }
};
*/
export function formatError(err) {
    return {
        code: err.originalError && err.originalError.code,
        locations: err.locations,
        message: err.message,
        path: err.path,
    };
}

export default makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});