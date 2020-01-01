import gql from "graphql-tag";

export const START_SERVER = gql`
    mutation start($name: String!) {
        startServer(serverName: $name) {
            id
            status
        }
    }`;