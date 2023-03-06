import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "sum", assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<number, never, unknown>["next"]) {
        var result = 0;
        var done: boolean | undefined, value: number;

        while ({ done, value } = await _next(), !done) {
            result += +value;
        }

        return result;
    }
));
