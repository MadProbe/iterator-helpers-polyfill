import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(1, "intersperse", assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], val: unknown) {
        var lastValue: unknown;
        var { done, value } = await next(lastValue);

        if (done) return;
        lastValue = yield value;
        while ({ done, value } = await next(lastValue), !done) {
            yield val;
            lastValue = yield value;
        }
    }
));
