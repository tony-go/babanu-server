import {ApolloServer} from 'apollo-server'

import typeDefs from '../typeDefs'
import resolvers from '../resolvers'
import { Context } from 'vm'

export const createTestServer = (context: Context): ApolloServer =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context,
  })
