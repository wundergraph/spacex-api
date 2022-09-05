import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {rateLimit} from "../utils";
import {makeExecutableSchema} from "graphql-tools";

export default async () => {
  const localSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      rateLimit
    }
  });

  return localSchema;
};
