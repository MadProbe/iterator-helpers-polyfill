import { assertIterator, mimic } from "@utils/utils.js";

export default mimic(0, "toArray", assertIterator(
    async function (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"]) {
        var array = [] as unknown[];
        var index = 0;
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done) {
            array[index++] = value;
        }
        return array;
    }
));