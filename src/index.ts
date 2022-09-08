require("dotenv").config();

import express from "express";
import { getDB } from "./context/db";
import getSchema from "./schema";
import context from "./context";
import graphql from "./servers/graphql";

(async () => {
  const port = process.env.PORT || 4000;
  const app = express();
  const schema = await getSchema();
  const db = await getDB();

  const config = {
    publicApiUrl: process.env.PUBLIC_API_URL || `http://localhost:${port}/graphql`,
    schema,
    context: { ...context, db }
  };

  graphql(app, config);
  //rest(app, config);

  const server = app.listen({ port }, () => {
    console.log(`🚀  Server ready http://localhost:${port}`);
  });

  const gracefulShutdown = (signal: string) => {
    console.log(`${signal} signal received: closing HTTP server`)
    server.close(() => {
      console.log('HTTP server closed')
      process.exit(0)
    })
  }

  process.once('SIGTERM', () => gracefulShutdown('SIGTERM'))
  process.once('SIGINT', () => gracefulShutdown('SIGINT'))
})();
