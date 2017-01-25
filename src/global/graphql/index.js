import ApolloClient, { createNetworkInterface } from 'apollo-client';

const host = process.env.HOSTNAME || '';

export const client = new ApolloClient({
  networkInterface:
    createNetworkInterface({ uri: `${host}/api/v1/health/graphql` }),
  shouldBatch: true,
});
