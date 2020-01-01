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

// Some fake data
const servers = [
    {
        id: "TestServer",
        status: "RUNNING",
        ports: [{
            protocol: "TCP",
            number: 8080,
        }],
        link: "http://example.com",
        envs: ["A=B", "C=D"],
        logs: "Everything\nis\nfine",
    }
];

const getServer = (id) => servers.find((e) => (e.id === id));


const startServer = (obj, args) => {
    const server = getServer(args.serverName);
    if (server !== undefined) {
        server.status = "STARTING";
        setTimeout(() => {
            server.status = "RUNNING";
        }, 10000);
        return server;
    }
    return undefined
};

const stopServer = (obj, args) => {
    const server = getServer(args.serverName);
    if (server !== undefined) {
        server.status = "STOPPING";
        setTimeout(() => {
            server.status = "STOPPED";
        }, 10000);
        return server;
    }
    return undefined
};

// The resolvers
const resolvers = {
    Query: {
        servers: () => servers,
        server: (obj, args) => getServer(args.name)
    },
    Mutation: {
        startServer,
        stopServer
    }
};

// Put together a schema
exports.schema = makeExecutableSchema({typeDefs, resolvers});