# Iterator Helpers Polyfill

This is a dependenciless ES2018+ polyfill for [Iterator Helpers Proposal](https://github.com/tc39/proposal-iterator-helpers/).  
The polyfill aims to be as specification-conformant as possible.  
**NOTE:** By default this package is pure: to add the `Iterator` and `AsyncIterator` as globals please use the `installIntoGlobal` function to add them into `globalThis`.  
**NOTE** By default `Iterator.range` and `AsyncIterator.range` are not inclusive in contrary to what was shown in the previous version of examples and this has been fixed and new `inclusive` parameter is introduced to control that.


# Method Documentation
## Polyfilled methods
These methods were polyfilled word-to-word as specified in the iterator helpers proposal.
### .map(mapper);
Transforms each `this` iterator value by calling passed mapper function.  
Example:  
```ts
Iterator.range(1, 5, 1, true).map(x => x * 2).toArray(); // [2, 4, 6, 8, 10]
```
### .filter(filterer);
Filters each value out from `this` iterator if called filterer function returns false for this value.  
Example:
```ts
Iterator.range(1, 10, 1, true).filter(x => x % 2 === 1).toArray(); // [1, 3, 5, 7, 9]
```
### .asIndexedPairs();
Aliases: .enumerate(); .entries();  
Transforn each value of `this` iterator into array of value's position index in the iterator and value itself.  
Example:
```ts
Iterator.range(1, 10, 1, true).map(x => Math.random() * 256 | x).asIndexedPairs().toArray() // [[0, 153], [1, 94], ...]
```
### .drop(times: number);
Aliases: .skip();  
Drops values from `this` iterator passed number of times (throws error if negative).  
Example:
```ts
Iterator.range(1, 10, 1, true).drop(5).toArray(); // [6, 7, 8, 9, 10]
```
### .take(times: number);
Takes values from `this` iterator passed number of times (throws error if negative).  
Example:
```ts
Iterator.range(1, 10, 1, true).take(5).toArray(); // [1, 2, 3, 4, 5]
```
### .every(fn);
Returns true if `this` iterator is empty or every value of it satisfies function `fn`.  
Examples:
```ts
Iterator.range(2, 10, 1, true).every(x => x % 2 === 0); // false
Iterator.range(1, 10, 1, true).every(x => x > 0); // true
Iterator.from().every(() => false); // true
```
### .find(finder);
Returns first value of `this` iterator that satisfies function `finder`.  
Example:
```ts
Iterator.range(1, 10, 1, true).find(x => x % 2 === 0) // 2
```
### .flatMap(mapper);
Yields values of each transformed values of `this` iterator by calling mapper (throws when mapper function throws non-iterable/iterator value).  
Examples:
```ts
Iterator.range(1, 4, 1, true).flatMap(x => `${ x }`.repeat(x)).toArray(); // ["1", "2", "2", "3", "3", "3", "4", "4", "4", "4"]
Iterator.range(1, 5, 1, true).flatMap(function* (x) {
    yield x ** 2;
    yield x * 10;
}).toArray(); // [1, 10, 4, 20, 9, 30, 16, 40, 25, 50]
```
### .forEach(mapper);
Calles mapper function with each value of `this` iterator and returns `undefined`.  
Example:
```ts
Iterator.range(1, 5, 1, true).forEach(console.log);
// Console output:
// 1
// 2
// 3
// 4
// 5
```
### .reduce(reducer, initialValue?);

**TLDR**: basically same as `Array.prototype.reduce()`.  
Firstly, this method creates an accumulator variable for later use from `initialValue` parameter if it's specified or gets first value of `this` iterator or throws if neither of these were the case.
Then it takes following values and calls `reducer` function with them and accumulator and then assigns result of the call to the accumulator variable.  
Examples:
```ts
Iterator.range(1, 10, 1, true).reduce((accumulator, x) => accumulator + x); // 55
["This", "is", "interesting!"].values().reduce((accumulator, x) => `${ accumulator } ${ x }`); // "This is interesting!"
["this", "is", "also", "interesting!"].values().reduce((accumulator, x) => `${ accumulator } ${ x }`, "And also i know that"); // "And i also know that this is interesting!"
Iterator.from().reduce(() => { throw "Never happens!" }, 1); // 1
Iterator.from().reduce(() => {}); // This throws an error since iterator is empty and no `initialValue` parameter is specified.
Iterator.from().reduce(() => {}, undefined); // But this works since `initialValue` parameter is set to the undefined value; undefined
```

### .some(filterer);
Returns true if `this` iterator is empty or also returns true if some values of `this` satisfy condition function `filterer` or returns false otherwise.  
Examples:
```ts
Iterator.range(1, 10, 1, true).some(x => x === 5); // true
Iterator.from().some(() => {}); // true
```

### .toArray();
Returns array containing all values of `this` iterator.  
Example:
```ts
Iterator.range(1, 5, 1, true).toArray(); // [1, 2, 3, 4, 5]
```

### Iterator.from(value);
Returns a iterator if value is a valid iterable (if iterator is with %Iterator.prototype% in the prototype chain) or wraps invalid iterator into %WrapForValidIteratorPrototype%.  
Examples:
```ts
Iterator.from([0, 1, 2, 3, 4]); // same as [0, 1, 2, 3, 4][Symbol.iterator]();
Iterator.from({ next() { return { done: true, value: undefined } } }); // wrapped into %WrapForValidIteratorPrototype%.
```

## Additional methods
### .max();
Returns maximum number found in `this` iterator.  
Example:
```ts
Iterator.from([0, -9, 23, 96, 10, 92]).max(); // 96
```

### .max();
Returns minimal number found in `this` iterator.  
Example:
```ts
Iterator.from([0, -9, 23, 96, 10, 92]).min(); // -9
```

### .average();
Returns average number from all the numbers from `this` iterator.  
Example:
```ts
Iterator.from([10, 50, 40, 20]).average(); // 30
```

### .chain(...iterators);
Returns an iterator which yields values sequencially of `this` iterator first and then all the `iterators` one by one left to right.  
Example:
```ts
Iterator.range(1, 3, 1, true).chain(Iterator.range(4, 6, 1, true), Iteratior.range(7, 10, 1, true)).toArray; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### .join(separator: string = ", ");
TLDR: Same as `Array.prototype.join()` but default separator is `", "`, not `","`.  
Returns a string of all values of `this` iterator stringified and joined by `seperator`.  
Example:
```ts
Iterator.range(1, 5, 1, true).join(); // "1, 2, 3, 4, 5"
```

### .cycle(times: number = Infinity);
Aliases: .repeat()
Repeats values of `this` iterator passed number of times or infinite amount of times if nothing is passed as `times` argument.  
Example:
```ts
Iterator.range(1, 3, 1, true).cycle(2).toArray(); // [1, 2, 3, 1, 2, 3]
```

### (Async)Iterator.range(start: number, end: number = (_ => (start = 0, _))(start), step: number = 1, inclusive: boolean = false)
Produces range of number values from `start` to `end` incremented by `step` until `start` is greater than (inclusive == false, default) / greater than or equal to (inclusive == true) `end` if `step` is positive and not zero, othewrwise until `start` is less than (inclusive == false) or less than or equal to (inclusive == true) `end`
Example:
```ts
// inclusive
Iterator.range(1, 3, 1, true).toArray(); // [1, 2, 3]
// exclusive
Iterator.range(1, 3, 1).toArray(); // [1, 2]
// inclusive reverse
Iterator.range(-1, -3, -1, true).toArray(); // [-1, -2, -3]
// exclusive
Iterator.range(-1, -3, -1).toArray(); // [-1, -2]
// edge cases
Iterator.range(1, 1, 0, false).toArray(); // []
Iterator.range(0, 1, 0, true).toArray(); // []
Iterator.range(1, 0, 0, false).take(2).toArray(); // [1, 1], .range() itetates infinitely if not in bounds by .take(2), never finishing
Iterator.range(0, 0, 0, true).take(2).toArray(); // [0, 0], .range() itetates infinitely if not in bounds by .take(2), never finisheing
```

## Notes:
* It also implements (Async)Iterator.prototype.flatMap() behavior from [issue #114 - flatMap should act like it does a `yield *` on each iterable](https://github.com/tc39/proposal-iterator-helpers/issues/114).  
* Pre-checks are done **BEFORE** all functions start doing their stuff, **INCLUDING** async ones. (Yet i have unsettled thinking about async function pre-checks, maybe variations of pre-check will come out behind a flag? (in the config variable)).  
* It takes globalThis by a polyfill written by Mathias Bynens from [his awensome article](https://mathiasbynens.be/notes/globalthis) (Lingers on fact that `__0x_6642_5d0e_72c2_4e09` preperty is writable and extensible in Object.prototype and Object.defineProperty isn't changed before the script is run).  
* UMD bundle is exposed into global as `__IteratorHelpersPolyfill`.  
* All bundles are **minified**.  
* Additional helpers can be removed by the `config` variable from exports.  
* This polyfill's size is less than 5 kb (4.62 kb atm) when compressed by Brotli compression algorithm.  
* Typings are made to accurately reflect behaviour of methods as much as possible.  

## Development:
**Please propose feature by opening an issue before starting working on pull request, because i can reject your proposal and your work won't be needed at all**  
1. Fork & Clone forked repository to your local machine.
2. Open cloned directory in your favorite editor.
3. Do some commits.
4. Open pull request!

## Build:
1. Install all modules by `npm i` in the command prompt.
2. Build by `npm run build` if you just need the .mjs bundle or `npm run build-full` if you also need commonjs and umd bundle.  
NOTE: Builds include source maps.
