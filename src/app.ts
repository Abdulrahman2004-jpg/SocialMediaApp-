import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createHandler } from "graphql-http/lib/use/express";

import authRouter from "./modules/auth/auth.controller";
import chatRouter from "./modules/chat/chat.controller";
import friendshipRouter from "./modules/friends/friendship.controller";
import postRouter from "./modules/posts/post.controller";
import reactionRouter from "./modules/reactions/react.controller";
import storyRouter from "./modules/stories/story.controller";
import userRouter from "./modules/users/user.controller";
import { gql_schema } from "./modules/graphql/graphql.schema";
import { global_error_handler } from "./shared/utils/global.error.handler";
import { WHITE_LIST } from "./config/config.service";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || WHITE_LIST.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use("/api/v1", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
}));

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "ConnectHub" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/friends", friendshipRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/reactions", reactionRouter);
app.use("/api/v1/stories", storyRouter);
app.use("/api/v1/users", userRouter);
app.all("/api/v1/graphql", createHandler({ schema: gql_schema }));

app.use((_req, res) => {
    res.status(404).json({ message: "Route not found", status: 404 });
});

app.use(global_error_handler);
