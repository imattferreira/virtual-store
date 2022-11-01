import {
  Express,
  Request,
  Response,
  RequestHandler as ExpressRequestHandler,
} from "express";

export interface HttpRequest extends Request {}

export interface HttpResponse extends Response {}

export interface Server extends Express {}

export interface RequestHandler extends ExpressRequestHandler {}
