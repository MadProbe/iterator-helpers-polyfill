import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "toArray", assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"]) {
        var array = [] as unknown[];
        var index = 0;
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = _next(), !done) {
            array[index++] = value;
        }
        return array;
    }
));