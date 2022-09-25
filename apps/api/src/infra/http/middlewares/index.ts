import express from "express";
import { Server } from "../interfaces";

function middlewares(server: Server) {
  server.use(express.json());
}

export default middlewares;
