import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { rateLimit } from "../utils";
import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} from "graphql-tools";

export default async () => {
  const localSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      rateLimit
    }
  });

  const schema = mergeSchemas({
    schemas: [localSchema]
  });

  return schema;
};
