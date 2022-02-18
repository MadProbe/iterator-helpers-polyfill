import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(1, "join", assertIterator(
    async function (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], string = ", ") {
        var result: string, joinString = String(string);
        var { done, value } = await next();

        if (done) return "";
        result = String(value);
        while ({ done, value } = await next(), !done) {
            result += joinString + value;
        }

        return result;
    }
));
