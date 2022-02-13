import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(0, "average", assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<number, never, unknown>["next"]) {
        var average: number = 0, count: number = 0;
        var done: boolean | undefined, value: number;

        while ({ done, value } = await _next(), !done) {
            average += value;
            count++;
        }

        return average / count;
    }
));
