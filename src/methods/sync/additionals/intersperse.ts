import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(1, "intersperse", assertIterator(
    function* (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], val: unknown) {
        var { done, value } = next();

        if (done) return;
        yield value;
        while ({ done, value } = next(), !done) {
            yield val;
            yield value;
        }
    }
));
