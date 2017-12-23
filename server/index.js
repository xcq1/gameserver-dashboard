const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

let debugMode = false;

process.argv.filter((val, i) => i > 1).forEach((val, i) => {
    if (val.indexOf("-debug") !== -1) {
        debugMode = true;
        console.log('Go to http://localhost:3000/graphiql to run queries!');
    }
});

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling'
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton'
    }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
    Query: {books: () => books}
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

if (debugMode) {
    // GraphiQL, a visual editor for queries
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
}

// Start the server
app.listen(3000, () => {
    console.log('Server up');
});