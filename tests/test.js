require('..');
const { readdirSync } = require("fs");
const { join } = require("path");

(async () => {
    const main = join(__dirname, '..')
    const syncTests = readdirSync(join(main, "tests/sync"));
    for (let i = 0; i < syncTests.length; i++) {
        const file = join(main, "tests/sync", syncTests[i]);
        const { exec } = require(file);
        try {
            exec();
        } catch (error) {
            console.error("Test in " + file + "failed with error: ", error);
        }
    }
    const asyncTests = readdirSync(join(main, "tests/async"));
    for (let i = 0; i < asyncTests.length; i++) {
        const file = join(main, "tests/async", asyncTests[i]);
        const { exec } = require(file);
        try {
            await exec();
        } catch (error) {
            console.error("Test in " + file + "failed with error: ", error);
        }
    }
})();
module.exports = null;
