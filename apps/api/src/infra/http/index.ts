import express from "express";
import "express-async-errors";
import "reflect-metadata";
import App from "./App";

const server = express();

new App(server).init();

process.on("SIGTERM", () => {
  process.exit();
});
