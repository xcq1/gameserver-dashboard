import gql from "graphql-tag";

export const STOP_SERVER = gql`
    mutation stop($name: String!) {
        stopServer(serverName: $name) {
            id
            status
        }
    }`;