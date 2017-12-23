const {schema} = require("./schema");

const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const helmet = require('helmet');

let debugMode = false;

process.argv.filter((val, i) => i > 1).forEach((val) => {
    if (val.indexOf("-debug") !== -1) {
        debugMode = true;
        console.log('Go to http://localhost:3001/graphiql to run queries!');
    }
});

// Initialize the app
const app = express();
app.use(helmet());

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

if (debugMode) {
    // GraphiQL, a visual editor for queries
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
}

// Start the server
app.listen(3001, () => {
    console.log('Server up');
});