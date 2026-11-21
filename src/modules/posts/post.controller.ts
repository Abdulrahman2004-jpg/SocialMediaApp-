import { NextFunction, Request, Response, Router } from "express";
import postService from "./post.service";
import validationMid from "../../shared/middlewares/validation";
import { createPostSchema, likePostSchema, updatePostSchema } from "./post.validation";
import multerCloud from "../../shared/middlewares/multer.cloud";
import { MimeEnum, StorageEnum } from "../../shared/enums/multer.enum";
import authMiddleware from "../../shared/middlewares/authentication";
import commentRouter from "../comments/comment.controller";

const postRouter = Router()

postRouter.use("/:postId/comments{/:commentId/reply}",commentRouter)

postRouter.post(
    "/createPost", 
    multerCloud({storage_type:StorageEnum.memory,file_type:[...MimeEnum.images,...MimeEnum.videos]}).array("attachments"),
    validationMid(createPostSchema),
    authMiddleware,
    postService.createPost)

postRouter.get(
    "/getPosts", 
    authMiddleware,
    postService.getPosts)

postRouter.put(
    "/updatePost/:postId", 
    multerCloud({storage_type:StorageEnum.memory,file_type:[...MimeEnum.images,...MimeEnum.videos]}).array("attachments"),
    (req: Request, res: Response, next: NextFunction) => {
        console.log("------------postMid---------");
        
        console.log(req?.files);
        next();
    },
    validationMid(updatePostSchema),
    authMiddleware,
    postService.updatePost)

export default postRouter