import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import schema, { formatError } from './src/schema.js';
import dataSources from './src/datasources/index.js';

async function startApolloServer(schema) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
        context: ({ req, connection }) => {
            return {
                token: 'foo'
            }
            /*
            if(req !== 'undefined') {
                const token = req.headers.authorization || '';
                const userAgent = req.headers['user-agent'] || '';
                console.log('context ->here');
                return { token, userAgent };
            }
            if (connection && false) {
                console.log('here connection');
                const chatApi = dataSources().chatApi;
                chatApi.context = connection.context;

                const orchestratorApi = dataSources().orchestratorApi;
                orchestratorApi.context = connection.context;

                connection.context.dataSources = {chatApi, orchestratorApi};
                return connection.context;
            }*/
        },
        dataSources: () => (dataSources),
        debug: true,
        // formatError
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 9000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`);
}

startApolloServer(schema);