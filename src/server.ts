import { IContext } from './interfaces/context.interface';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import environments from './config/environments';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
import Database from './lib/database';

// Configuración de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
    const env = environments;
    console.log(env);
}

async function init() {
    const app = express();

    app.use('*', cors());

    app.use(compression());

    const database = new Database();

    const db = await database.init();

    const context = async({req, connection}: IContext) => {
        const token = (req) ? req.headers.authorization : connection.authorization;
        return { db, token };
    };

    const server = new ApolloServer({
        schema,
        introspection: true,
        context
    });

    server.applyMiddleware({app});

    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }));

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 2002;
    httpServer.listen(
        {
            port: PORT
        },
        () => console.log(`http://localhost:${PORT} API MEANG - Online Shop Start`)
    );
}
init();

