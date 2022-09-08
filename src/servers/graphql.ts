import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import fs from "fs/promises";
import depthLimit from "graphql-depth-limit";
import { createComplexityLimitRule } from "graphql-validation-complexity";

export default (app, { schema, context, publicApiUrl }) => {
  const graphql = new ApolloServer({
    schema,
    context,
    // engine: {
    //   apiKey: process.env.ENGINE_API_KEY
    // },
    validationRules: [depthLimit(10), createComplexityLimitRule(1000)],
    introspection: true
  });

  const buildPath = path.join(process.cwd(), "static");
  const period = 60 * 15; // 15 minutes

  // expose graphqli-explorer
  app.get("/graphql", (req, res) => {
    fs.readFile(path.join(buildPath + "/index.html"), "utf8").then((data) => {
      res.set('Cache-control', `public, max-age=${period}`)
      res.send(data.replace("{{PUBLIC_API_URL}}", publicApiUrl));
    }).catch((err) => {
      console.error(err);
      res.send("Internal Server Error");
    })
  });

  // graphql api by default
  app.get("/", (_, res) => {
    res.redirect(graphql.graphqlPath);
  });

  graphql.applyMiddleware({
    app
  });
};
