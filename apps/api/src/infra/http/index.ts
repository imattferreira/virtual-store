import express from "express";
import App from "./App";

const server = express();

new App(server).init();

process.on("SIGTERM", () => {
  process.exit();
});
