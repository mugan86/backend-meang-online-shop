import { PubSub } from 'graphql-subscriptions';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import express, { Application } from 'express';
import { execute, GraphQLSchema, subscribe } from 'graphql';
import { createServer, Server } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import Database from './lib/database';
import environments from './config/environments';
import { IContext } from './interfaces/context.interface';

class GraphQLServer {
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT = (process.env.PORT) ? +process.env.PORT: 3025;
  private schema!: GraphQLSchema;
  private database!: Database;
  private pubsub!: PubSub;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error(
        'Necesitamos un schema de GraphQL para trabajar con APIs GraphQL'
      );
    }
    this.schema = schema;
    if (process.env.NODE_ENV !== 'production') {
      const envs = environments;
      console.log(envs);
    }
    this.init();
  }

  private init() {
    this.configExpress();
    this.initializeDbPubSub();
    this.configApolloServerExpress();
    // this.configRoutes();
  }

  private async initializeDbPubSub() {
    this.database = new Database();
    this.pubsub = new PubSub();
  }

  private configExpress() {
    this.app = express();

    this.app.use(compression());

    this.httpServer = createServer(this.app);
  }

  private async configApolloServerExpress() {
    const db = await this.database.init();
   
    const apolloServer = new ApolloServer({
      schema: this.schema,
      introspection: true,
      context: async ({req, connection}: IContext) => {
        return {
          db,
          pubsub: this.pubsub,
          token : req ? req.headers.authorization : connection.authorization
        };
      },
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: this.app, cors: true });

    // NUEVA MANERA DE IMPLEMENTAR LA CREACIÓN DE LA IMPLEMENTACIÓN
    // PARA OBTENER INFORMACIÓN DE ACTUALIZACIONES
    SubscriptionServer.create(
      {
        schema: this.schema,
        execute,
        subscribe,
        // Importante añadir esto para pasar la información del contexto
        onConnect: () => ({ db, pubsub: this.pubsub, user: 'Anartz' }),
      },
      { server: this.httpServer, path: apolloServer.graphqlPath }
    );
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}

export default GraphQLServer;