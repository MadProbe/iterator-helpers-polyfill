# Iterator Helpers Polyfill

This is a polyfill for [Iterator Helpers Proposal](https://github.com/tc39/proposal-iterator-helpers/).  
It is independed (doesn't have any dependecies) and can be used in enviroments supporting ES2018 (Notably Async Generators, Generators, Async Functions, Reflect and Proxy).  
The polyfill aims to be as immune to built-in values changes as possible (NOTE: It borrows and caches built-in values from globalThis only once at start and uses them without accessing them after, so if they are changed before the script is run, the polyfill will use the changed built-ins (or not so at this case)).
The polyfill aims to be as close to the specification as possible, including `function () { [native code] }` return value of functions.toString()  

## Notes:
It also implements (Async)Iterator.prototype.flatMap() behavior from [issue #114 - flatMap should act like it does a `yield *` on each iterable](https://github.com/tc39/proposal-iterator-helpers/issues/114)
