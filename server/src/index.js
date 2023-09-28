"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express_1 = __importDefault(require("express"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./db");
const typeDefs = `#graphql

type Todo {
  id: String
  title: String
  completed: Boolean
}

type Query {
  Todos: [Todo]
}
`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        todos: () => db_1.db.user.findMany(),
    },
};
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
// @ts-ignore
await server.start();
app.use((0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server));
// @ts-ignore
await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve));
console.log(`🚀 Server ready at http://localhost:8080`);
