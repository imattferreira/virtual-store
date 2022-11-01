// TODO create DOCS
// TODO refactor
import CreateBrandFactory from "../../../domain/modules/brands/use-cases/create-brand/create-brand-factory";
import UploadImageFactory from "../../../domain/modules/images/use-cases/upload-image/upload-image-factory";
import CreateProductFactory from "../../../domain/modules/products/use-cases/create-product/create-product-factory";
import GetProductFactory from "../../../domain/modules/products/use-cases/get-product/get-product-factory";
import ListProductsFactory from "../../../domain/modules/products/use-cases/list-products/list-products-factory";
import { HttpRequest, HttpResponse, Server } from "../interfaces";
import uploader from "../middlewares/uploader";

function router(server: Server) {
  server.post("/products", (req: HttpRequest, res: HttpResponse) =>
    new CreateProductFactory().init(req, res)
  );
  server.post("/brands", (req: HttpRequest, res: HttpResponse) =>
    new CreateBrandFactory().init(req, res)
  );
  server.get("/products", (req: HttpRequest, res: HttpResponse) =>
    new ListProductsFactory().init(req, res)
  );
  server.get("/products/:slug", (req: HttpRequest, res: HttpResponse) =>
    new GetProductFactory().init(req, res)
  );
  server.post(
    "/images",
    uploader({ destination: "/", fieldname: "image" }),
    (req: HttpRequest, res: HttpResponse) =>
      new UploadImageFactory().init(req, res)
  );
}

export default router;
