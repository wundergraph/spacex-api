require("dotenv").config();
import express from "express";
import { getDB } from "./context/db";
import getSchema from "./schema";
import context from "./context";
import graphql from "./servers/graphql";
//import rest from "./servers/rest";

(async () => {
  const port = process.env.PORT || 4000;
  const app = express();
  const schema = await getSchema();
  const db = await getDB();

  const config = {
    schema,
    context: { ...context, db }
  };

  graphql(app, config);
  //rest(app, config);

  app.listen({ port }, () => {
    console.log(`🚀  Server ready http://localhost:${port}`);
  });
})();
