import { PrismaClient } from "@prisma/client";

let connection: PrismaClient;

function connect() {
  if (!connection) {
    connection = new PrismaClient();
  }
  return connection;
}

export default connect();
