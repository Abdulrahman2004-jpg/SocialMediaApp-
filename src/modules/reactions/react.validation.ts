import * as z from "zod";
import { general_rules } from "../../shared/validation/generalRules.validation";
import { OnModelEnum } from "../../shared/enums/comment.enum";
import { ReactTypeEnum } from "../../shared/enums/react.enum";

export const createReactSchema = {
    body:z.object({
        refId:general_rules.id,
        onModel:z.enum(OnModelEnum),
        reactType:z.enum(ReactTypeEnum)
    })
}



