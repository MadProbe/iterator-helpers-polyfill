import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(1, "intersperse", assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], val: unknown) {
        var { done, value } = await next();

        if (done) return;
        yield value;
        while ({ done, value } = await next(), !done) {
            yield val;
            yield value;
        }
    }
));
