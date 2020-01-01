import gql from "graphql-tag";

export const GET_SERVERS = gql`
    query servers {
        servers {
            id
            status
            ports {
                number
                protocol
            }
            link
        }
    }`;