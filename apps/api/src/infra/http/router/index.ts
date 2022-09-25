import CreateProductFactory from "../../../domain/modules/products/use-cases/create-product/create-product-factory";
import { HttpRequest, HttpResponse, Server } from "../interfaces";

function router(server: Server) {
  server.post("/products", (req: HttpRequest, res: HttpResponse) =>
    new CreateProductFactory().init(req, res)
  );
}

export default router;
