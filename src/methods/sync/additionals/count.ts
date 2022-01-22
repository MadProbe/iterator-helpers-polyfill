import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "count", assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"]) {
        var index = 0;

        while (!(_next()).done) {
            index++;
        }

        return index;
    }
));
