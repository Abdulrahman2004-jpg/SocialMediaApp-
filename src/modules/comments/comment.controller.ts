import { NextFunction, Request, Response, Router } from "express";
import commentService from "./comment.service";
import validationMid from "../../shared/middlewares/validation";
import { createCommentSchema} from "./comment.validation";
import multerCloud from "../../shared/middlewares/multer.cloud";
import { MimeEnum, StorageEnum } from "../../shared/enums/multer.enum";
import authMiddleware from "../../shared/middlewares/authentication";

const commentRouter = Router({mergeParams:true})

commentRouter.post(
    "/", 
    multerCloud({storage_type:StorageEnum.memory,file_type:[...MimeEnum.images,...MimeEnum.videos]}).array("attachments"),
    validationMid(createCommentSchema),
    authMiddleware,
    commentService.createComment)



export default commentRouter