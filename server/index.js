const {schema} = require("./schema");

const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');

let debugMode = false;

process.argv.filter((val, i) => i > 1).forEach((val) => {
    if (val.indexOf("-debug") !== -1) {
        debugMode = true;
        console.log('Go to http://localhost:3001/graphiql to run queries!');
    }
});

// Initialize the app
const app = express();

if (!debugMode) {
    app.use(basicAuth({
        users: { 'admin': process.env.BASIC_AUTH || Math.random().toString(36).substring(2, 15)},
        challenge: true
    }));
} else {
    app.use(cors()); // enables *
}
app.use(helmet());
app.use(express.static("public"));

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