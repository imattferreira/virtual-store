import { Server } from "../interfaces";

function router(server: Server) {
  server.get("/", (req, res) => res.json({ message: "hello world" }));
}

export default router;
