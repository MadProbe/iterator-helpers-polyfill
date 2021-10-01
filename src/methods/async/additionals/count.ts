import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "count", assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"]) {
        var index = 0;

        while (!(await _next()).done) {
            index++;
        }

        return index;
    }
));
