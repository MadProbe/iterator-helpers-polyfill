/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />
// @ts-ignore
var Iterator = function Iterator() { };
// @ts-ignore
var AsyncIterator = function AsyncIterator() { };
((self, u) => {
    function* noop() { }
    async function* asyncNoop() { }
    const ToInteger = (argument) => {
        let number = +argument;
        if (number !== number || number === 0) {
            return 0;
        }
        if (number === 1 / 0 || number === -1 / 0) {
            return number;
        }
        let integer = floor(abs(number));
        if (integer === 0) {
            return 0;
        }
        return integer;
    };
    const assert = (iterator) => {
        if (iterator === null || iterator === u)
            throw typeerror($reasons[1]);
        const next = iterator.next;
        if (!isCallable(next))
            throw typeerror(next + $reasons[0]);
        return next;
    };
    const IteratorClose = (iterator, value) => {
        const $$return = iterator.return;
        if ($$return !== u)
            call($$return, iterator);
        throw value;
    };
    const AsyncIteratorClose = async (iterator, value) => {
        const $$return = iterator.return;
        if ($$return !== u)
            await call($$return, iterator);
        throw value;
    };
    // const empty = {};
    // const slots = (object: any) => {
    //     const keys = [];
    //     const values = [];
    //     return {
    //         get(O: any, prop: any) {
    //             if (O === object) {
    //                 return values[keys.indexOf(prop)];
    //             } else return empty;
    //         },
    //         set(O: any, prop: any, val: any) {
    //             if (O === object) {
    //                 const index = ~(~keys.indexOf(prop) || ~keys.length);
    //                 values[index] = val;
    //                 keys[index] = prop;
    //             } else return empty;
    //         }
    //     };
    // };
    const reason = method => `Method WrapForValidIteratorPrototype.${method} called on incompatible receiver `;
    const WrapForValidIteratorPrototype = (iterable, next) => {
        var object = {
            next(value) {
                let O = this;
                if (object !== O)
                    throw typeerror(reason("next") + O);
                return 0 in arguments ? call(next, iterable, value) : call(next, iterable);
            },
            return(value) {
                let O = this;
                if (object !== O)
                    throw typeerror(reason("return") + O);
                let $$return = iterable["return"];
                return { value: $$return !== u ? call($$return, iterable) : value, done: true };
            },
            throw(value) {
                let O = this;
                if (object !== O)
                    throw typeerror(reason("throw") + O);
                let $$throw = O["throw"];
                if ($$throw === u) {
                    throw value;
                }
                else {
                    return call($$throw, iterable, value);
                }
            }
        };
        Object.setPrototypeOf(object, Iterator.prototype);
        return object;
    };
    const WrapForValidAsyncIteratorPrototype = (iterable, next) => {
        var object = {
            async next(value) {
                let O = this;
                if (object !== O)
                    throw typeerror(reason("next") + O);
                return 0 in arguments ? await call(next, iterable, value) : await call(next, iterable);
            },
            async return(value) {
                let O = this;
                if (object !== O)
                    throw typeerror(reason("return") + O);
                let $$return = iterable["return"];
                return { value: $$return !== u ? await call($$return, iterable) : value, done: true };
            },
            async throw(value) {
                let O = this;
                if (object !== O)
                    throw typeerror(reason("throw") + O);
                let $$throw = O["throw"];
                if ($$throw === u) {
                    throw value;
                }
                else {
                    return await call($$throw, iterable, value);
                }
            }
        };
        Object.setPrototypeOf(object, AsyncIterator.prototype);
        return object;
    };
    const { floor, abs } = Math;
    const { getPrototypeOf, defineProperty, getOwnPropertyNames } = Object;
    const typeerror = TypeError;
    const $reasons = [" is not function", " is not iterable (cannot read property Symbol(Symbol.iterator))", "Reduce of empty array with no initial value"];
    const isCallable = (fn) => typeof fn === "function";
    const assertCallable = (fn) => {
        if (!isCallable(fn))
            throw typeerror(fn + "is not callable");
    };
    const _call = isCallable.call;
    const call = _call.bind(_call);
    const SymbolToStringTag = Symbol.toStringTag;
    const IteratorPrototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(noop())));
    const AsyncIteratorPrototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(asyncNoop())));
    const polyfill = (constructor, prototype, klass) => {
        prototype.constructor = constructor;
        constructor.prototype = prototype;
        if (SymbolToStringTag != u)
            defineProperty(prototype, SymbolToStringTag, { value: constructor.name, configurable: true });
        for (const key of getOwnPropertyNames(klass.prototype)) {
            defineProperty(prototype, key, {
                value: klass.prototype[key],
                writable: true,
                configurable: true
            });
        }
        self[constructor.name] = constructor;
    };
    const IteratorFrom = Iterator.from = function (O) {
        var object = Object(O);
        var usingIterator = object[Symbol.iterator];
        var iteratorRecord;
        if (usingIterator != u) {
            iteratorRecord = call(usingIterator, object);
            if (iteratorRecord instanceof Iterator)
                return iteratorRecord;
        }
        else
            iteratorRecord = object;
        return WrapForValidIteratorPrototype(iteratorRecord, assert(iteratorRecord));
    };
    const AsyncIteratorFrom = AsyncIterator.from = function (O) {
        var _a, _b;
        var object = Object(O);
        var usingIterator = (_b = (_a = object[Symbol.asyncIterator]) !== null && _a !== void 0 ? _a : object[Symbol.iterator]) !== null && _b !== void 0 ? _b : object['@@iterator'];
        var asyncIteratorRecord;
        if (usingIterator != u) {
            asyncIteratorRecord = call(usingIterator, object);
            if (asyncIteratorRecord instanceof AsyncIterator)
                return asyncIteratorRecord;
        }
        else
            asyncIteratorRecord = object;
        return WrapForValidAsyncIteratorPrototype(asyncIteratorRecord, assert(asyncIteratorRecord));
    };
    polyfill(Iterator, IteratorPrototype, class {
        *map(mapper) {
            let self = this;
            let _next = assert(self);
            assertCallable(mapper);
            let lastValue;
            try {
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield mapper(next.value);
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        *filter(filterer) {
            let self = this;
            let _next = assert(self);
            assertCallable(filterer);
            let lastValue;
            try {
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done)
                        return;
                    const value = next.value;
                    const selector = filterer(value);
                    if (selector)
                        lastValue = yield value;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        *take(limit) {
            let self = this;
            let _next = assert(self);
            let remaining = ToInteger(limit);
            let lastValue;
            try {
                while (remaining--) {
                    const next = call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield next.value;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        *drop(limit) {
            let self = this;
            let _next = assert(self);
            let remaining = ToInteger(limit);
            let lastValue;
            try {
                while (remaining--) {
                    if (call(_next, self, lastValue).done)
                        return;
                }
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield next.value;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        *asIndexedPairs() {
            let self = this;
            let _next = assert(self);
            let lastValue, index = 0;
            try {
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield [index++, next.value];
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        *flatMap(mapper) {
            let self = this;
            let _next = assert(self);
            assertCallable(mapper);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done)
                        return;
                    // Issue #114 flatMap should act like it does a `yield *` on each iterable
                    // https://github.com/tc39/proposal-iterator-helpers/issues/114
                    yield* IteratorFrom(mapper(next.value));
                    // const innerIterator = mapper(next.value as T)[Symbol.iterator]();
                    // const __next = innerIterator.next;
                    // let innerAlive = true;
                    // while (innerAlive) {
                    //     const innerNext = call(__next, innerIterator);
                    //     if (innerNext.done) innerAlive = false;
                    //     else yield innerNext.value as R;
                    // }
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        reduce(reducer, initialValue) {
            let self = this;
            let _next = assert(self);
            let accumulator = initialValue;
            assertCallable(reducer);
            if (!(1 in arguments)) { // It's the only way to check if initialValue is not present
                let __next = call(_next, self);
                if (__next.done) {
                    throw typeerror($reasons[2]);
                }
                accumulator = __next.value;
            }
            while (1) {
                const __next = call(_next, self);
                if (__next.done)
                    return accumulator;
                accumulator = reducer(accumulator, __next.value);
            }
        }
        toArray() {
            let self = this;
            let _next = assert(self);
            let array = [];
            let index = 0;
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done)
                        return array;
                    array[index++] = next.value;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        forEach(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done)
                        return;
                    fn(next.value);
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        some(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done)
                        return false;
                    if (fn(next.value))
                        return true;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        every(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done)
                        return true;
                    if (!fn(next.value))
                        return false;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
        find(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done)
                        return;
                    const value = next.value;
                    if (fn(value))
                        return value;
                }
            }
            catch (error) {
                IteratorClose(self, error);
            }
        }
    });
    polyfill(AsyncIterator, AsyncIteratorPrototype, class {
        async *map(mapper) {
            let self = this;
            let _next = assert(self);
            assertCallable(mapper);
            let lastValue;
            try {
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield mapper(next.value);
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *filter(filterer) {
            let self = this;
            let _next = assert(self);
            assertCallable(filterer);
            let lastValue;
            try {
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done)
                        return;
                    const value = next.value;
                    const selector = await filterer(value);
                    if (selector)
                        lastValue = yield value;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *take(limit) {
            let self = this;
            let _next = assert(self);
            let remaining = ToInteger(limit);
            let lastValue;
            try {
                while (remaining--) {
                    const next = await call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield next.value;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *drop(limit) {
            let self = this;
            let _next = assert(self);
            let remaining = ToInteger(limit);
            let lastValue;
            try {
                while (remaining--) {
                    if ((await call(_next, self, lastValue)).done)
                        return;
                }
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield next.value;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *asIndexedPairs() {
            let self = this;
            let _next = assert(self);
            let lastValue, index = 0;
            try {
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done)
                        return;
                    lastValue = yield [index++, next.value];
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *flatMap(mapper) {
            let self = this;
            let _next = assert(self);
            assertCallable(mapper);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done)
                        return;
                    // Issue #114 flatMap should act like it does a `yield *` on each iterable
                    // https://github.com/tc39/proposal-iterator-helpers/issues/114
                    yield* AsyncIteratorFrom(await mapper(next.value));
                    // const innerIterator = mapper(next.value as T)[Symbol.iterator]();
                    // const __next = innerIterator.next;
                    // let innerAlive = true;
                    // while (innerAlive) {
                    //     const innerNext = await call(__next, innerIterator);
                    //     if (innerNext.done) innerAlive = false;
                    //     else yield innerNext.value as R;
                    // }
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async reduce(reducer, initialValue) {
            let self = this;
            let _next = assert(self);
            let accumulator = initialValue;
            assertCallable(reducer);
            try {
                if (!(1 in arguments)) { // It's the only way to check if initialValue is not present
                    let __next = await call(_next, self);
                    if (__next.done) {
                        throw typeerror($reasons[2]);
                    }
                    accumulator = __next.value;
                }
                while (1) {
                    const __next = await call(_next, self);
                    if (__next.done)
                        return accumulator;
                    accumulator = await reducer(accumulator, __next.value);
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async toArray() {
            let self = this;
            let _next = assert(self);
            let array = [];
            let index = 0;
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done)
                        return array;
                    array[index++] = next.value;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async forEach(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done)
                        return;
                    await fn(next.value);
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async some(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done)
                        return false;
                    if (fn(next.value))
                        return true;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async every(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done)
                        return true;
                    if (!fn(next.value))
                        return false;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async find(fn) {
            let self = this;
            let _next = assert(self);
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done)
                        return;
                    const value = next.value;
                    if (fn(value))
                        return value;
                }
            }
            catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
    });
})((function () {
    var proto = Object.prototype;
    Object.defineProperty(proto, '__magic__', {
        get: function () {
            return this;
        },
        configurable: true
    });
    // JS magic should be ignored
    // @ts-ignore
    var global = __magic__;
    // @ts-ignore
    delete proto.__magic__;
    return global;
}()));
//# sourceMappingURL=iterators.js.map