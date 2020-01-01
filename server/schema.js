const resolvers = require("./resolvers");

const {makeExecutableSchema} = require('graphql-tools');

// The GraphQL schema in string form
// language=GraphQL Schema
const typeDefs = `
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        servers: [Server]
        server(name: String): Server
    }

    type Server {
        id: String!,
        status: ServerState!,
        ports: [Port]!,
        link: String!,
        envs: [String],
        logs: String
    }

    enum ServerState {
        STOPPED
        STARTING
        RUNNING
        STOPPING
        PROBLEM
    }

    type Port {
        protocol: PortProtocol,
        number: Int
    }

    enum PortProtocol {
        TCP
        UDP
    }

    type Mutation {
        startServer(serverName: String): Server
        stopServer(serverName: String): Server
    }

`;

// Put together a schema
exports.schema = makeExecutableSchema({typeDefs, resolvers: resolvers.resolvers});