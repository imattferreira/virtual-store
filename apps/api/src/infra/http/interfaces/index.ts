import { Express, Request, Response } from "express";

export interface HttpRequest extends Request {}

export interface HttpResponse extends Response {}

export interface Server extends Express {}
