import { NextFunction, Request, Response, Router } from "express";
import validationMid from "../../shared/middlewares/validation";
import authMiddleware from "../../shared/middlewares/authentication";
import { createReactSchema } from "./react.validation";
import reactService from "./react.service";

const reactRouter = Router()



reactRouter.post(
    "/createReact", 
    validationMid(createReactSchema),
    authMiddleware,
    reactService.createReact)


export default reactRouter