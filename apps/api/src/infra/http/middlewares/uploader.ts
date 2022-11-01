// TODO refactor
import path from "node:path"; // TODO create lib
import crypto from "node:crypto"; // TODO create lib
import multer from "multer";
import { RequestHandler } from "../interfaces";

interface UploaderMiddlewareParams {
  destination: string;
  fieldname: string;
}

function uploader({
  destination,
  fieldname,
}: UploaderMiddlewareParams): RequestHandler {
  const destinationDirectoryName = destination.replace("/", "");
  const localDestination = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "tmp",
    destinationDirectoryName.length === 0 ? "" : destinationDirectoryName
  );

  const middleware = multer({
    dest: localDestination,
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "tmp/");
      },
      filename(req, file, callback) {
        const extension = file?.originalname.split(".")[1];
        const filename = crypto.randomBytes(64).toString("hex");
        const completeFilename = `${filename}.${extension}`;

        callback(null, completeFilename);
      },
    }),
  });

  return middleware.single(fieldname);
}

export default uploader;
