import gql from "graphql-tag";

export const GET_SERVERS = gql`
    query servers {
        servers {
            status
            name
            ports {
                number
                protocol
            }
            link
        }
    }`;