# Iterator Helpers Polyfill

This is a polyfill for [Iterator Helpers Proposal](https://github.com/tc39/proposal-iterator-helpers/).  
It is independed (doesn't have any dependecies) and can be used in enviroments supporting ES2018 (Notably Async Generators, Generators, Async Functions, Reflect and Proxy).  
The polyfill aims to be as immune to built-in values changes as possible (NOTE: It borrows and caches built-in values from globalThis only once at start and uses them without accessing them after, so if they are changed before the script is run, the polyfill will use the changed built-ins (or not so at this case)).
The polyfill aims to be as close to the specification as possible, including `function () { [native code] }` return value of functions.toString()  

## Notes:
It also implements (Async)Iterator.prototype.flatMap() behavior from [issue #114 - flatMap should act like it does a `yield *` on each iterable](https://github.com/tc39/proposal-iterator-helpers/issues/114).

## Development:
**Please propose feature by opening an issue before starting working on pull request, because i can reject your proposal and your work won't be needed at all**  
1. Fork & Clone forked repository to your local machine.
2. Open cloned directory in your favorite editor.
3. Do some commits.
4. Open pull request!

## Build:
1. Install all modules by `npm i --force` (Ignore the warnings) in the command prompt.
2. Build by `npm run build` if you just need the .mjs bundle or `npm run build-full` if you also need .cjs bundle.  
NOTE: Builds include source maps.
