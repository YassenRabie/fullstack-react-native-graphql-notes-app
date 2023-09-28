import { ApolloServer } from '@apollo/server';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http';
import cors from 'cors';
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from 'body-parser';
import {db, Todo} from "./db";

type AddTodoInput = { title: string; }
type UpdateTodoInput = { id: string; title?: string; completed?: boolean; }

const typeDefs = `#graphql

input AddTodoInput {
  title: String!
}

input UpdateTodoInput {
  id: String!
  title: String
  completed: Boolean
}

type Todo {
  id: String
  title: String
  completed: Boolean
}

type Query {
  todos: [Todo]
  todo(id: String): Todo
}

type Mutation {
  addTodo(input: AddTodoInput!): Todo!
  updateTodo(input: UpdateTodoInput!): Todo!
  deleteTodo(id: String!): [Todo]!
}
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    todos:  () => db.todo.findMany(),
    todo:  (_parent: any, { id }: { id: string }) => db.todo.findById(id),
  },
  Mutation: {
    addTodo: async (_parent: any, { input }: { input: AddTodoInput }): Promise<Todo> => await db.todo.create(input),
    updateTodo: async (_parent: any, { input }: { input: UpdateTodoInput }): Promise<Todo> => await db.todo.update(input),
    deleteTodo: async (_parent: any, { id }: { id: string }) => await db.todo.delete(id)
  }
};

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


(async () => {
  await server.start();

  app.use(
      cors(),
      bodyParser.json(),
      expressMiddleware(server),
  );

  // @ts-ignore
  await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8080`);
})();