import { Router } from "express";
import authService from "./auth.service";
import validationMid from "../../shared/middlewares/validation";
import chatRouter from "../chat/chat.controller";
import {
  signUpSchema,
  signInSchema,
  confirmEmail_schema,
  resendEmail_schema,
} from "./auth.validation";

const authRouter = Router();

authRouter.use("/:userId/chat", chatRouter);

authRouter.post("/signUp", validationMid(signUpSchema), authService.signUp);
authRouter.post("/signIn", validationMid(signInSchema), authService.signIn);
authRouter.post("/confirm_email", validationMid(confirmEmail_schema), authService.confirmEmail);
authRouter.post("/resend_email", validationMid(resendEmail_schema), authService.resendEmail);
authRouter.post("/signInWithGoogle", authService.signUpWithGmail);

export default authRouter;