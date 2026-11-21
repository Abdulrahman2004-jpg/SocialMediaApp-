import http from "node:http";

import { app } from "./app";
import { PORT } from "./config/config.service";
import { checkConnectionDB } from "./database/db.connection";
import redisService from "./shared/services/redis.service";
import socketGateway from "./modules/socket/socket.gateway";
import storyCleanupService from "./modules/stories/story.cleanup";

const server = http.createServer(app);

const startServer = async () => {
    await checkConnectionDB();
    await redisService.connect();
    socketGateway.initIo(server);
    storyCleanupService.start();

    server.listen(PORT, () => {
        console.log(`ConnectHub server listening on port ${PORT}`);
    });
};

void startServer();
