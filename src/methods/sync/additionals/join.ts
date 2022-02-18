import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(1, "join", assertIterator(
    function (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], string = ", ") {
        var result: string, joinString = String(string);
        var { done, value } = next();

        if (done) return "";
        result = String(value);
        while ({ done, value } = next(), !done) {
            result += joinString + value;
        }

        return result;
    }
));
