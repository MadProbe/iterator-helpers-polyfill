import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "max", assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<number, never, unknown>["next"]) {
        var result = -1 / 0;
        var done: boolean | undefined, value: number;
        while ({ done, value } = await _next(), !done) {
            if (result < value) result = +value;
        }
        return result;
    }
));