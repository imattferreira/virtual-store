import "../database";

import middlewares from "./middlewares";
import { Server } from "./interfaces";
import router from "./router";

class App {
  constructor(private readonly server: Server) {}

  init() {
    middlewares(this.server);
    router(this.server);

    this.server.listen(3333, () =>
      console.log("\n🚀 server running at http://localhost:3333/")
    );
  }
}

export default App;
