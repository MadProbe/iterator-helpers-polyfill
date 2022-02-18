import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "average", assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<number, never, unknown>["next"]) {
        var average = 0, count = 0;
        var done: boolean | undefined, value: number;

        while ({ done, value } = _next(), !done) {
            average += value;
            count++;
        }

        return average / count;
    }
));
