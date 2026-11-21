import { Router } from "express";
import chatService from "./chat.service";
import authMiddleware from "../../shared/middlewares/authentication";
import multerCloud from "../../shared/middlewares/multer.cloud";
import { MimeEnum, StorageEnum } from "../../shared/enums/multer.enum";

const chatRouter = Router({mergeParams:true})

chatRouter.get("/",authMiddleware,chatService.getChat)

chatRouter.get("/group/:groupId",authMiddleware,chatService.getGroupChat)

chatRouter.post(
    "/group",
    authMiddleware,
    multerCloud({
        storage_type:StorageEnum.memory,
        file_type: MimeEnum.images,
    }).single("attachment"),
    chatService.createGroup)

export default chatRouter