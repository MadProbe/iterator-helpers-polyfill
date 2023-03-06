import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "sum", assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<number, never, unknown>["next"]) {
        var result = 0;
        var done: boolean | undefined, value: number;

        while ({ done, value } = _next(), !done) {
            result += +value;
        }

        return result;
    }
));
