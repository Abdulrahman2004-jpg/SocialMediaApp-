import admin from "firebase-admin"
import {existsSync, readFileSync} from "node:fs"
import {resolve} from "node:path"
import RedisService from "./redis.service";
import { Types } from "mongoose";

class NotificationService {
    private readonly client?: admin.app.App;
    private readonly _redisService = RedisService;

    constructor() {
        const credentialsPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
            || resolve(process.cwd(), "src/config/connecthub-firebase-adminsdk.json");

        if (!existsSync(credentialsPath)) {
            if (process.env.NODE_ENV === "production") {
                throw new Error(`Firebase service-account credentials not found at ${credentialsPath}`);
            }

            console.warn("Firebase credentials not found; push notifications are disabled outside production.");
            return;
        }

        const serviceAccount = JSON.parse(readFileSync(credentialsPath, "utf8"));
        this.client = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    async sendNotification(
        {
            userId,
            token,
            data
        }:
        {
            userId:Types.ObjectId,
            token:string,
            data:{title:string,body:string}
        }
    ){
        if (!this.client) return;

        const message = {token,data}

        try {
            await this.client.messaging().send(message)
        } catch (error: any) {
            if (error?.errorInfo?.code === 'messaging/registration-token-not-registered') {
                await this._redisService.removeFCM(userId, token)
                console.log({message: "there is one token removed", token})
            }
        }

    }

    async sendNotifications(
        {
            userId,
            tokens,
            data
        }:
        {
            userId:Types.ObjectId,
            tokens:string[],
            data:{title:string,body:string}
        }
    ){
        await Promise.all(tokens.map((token)=>{
            return this.sendNotification({userId,token,data})
        }))
    }
}

export default new NotificationService()