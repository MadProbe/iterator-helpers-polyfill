/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />

interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
    map<R = T>(mapper: (value: T) => R): Generator<R, TReturn, TNext>;
    filter(filterer: (value: T) => boolean): Generator<T, TReturn, TNext>;
    filter<R extends T = T>(filterer: (value: T) => value is R): Generator<R, TReturn, TNext>;
    asIndexedPairs(): Generator<readonly [number, T], TReturn, TNext>;
    take(limit: number): Generator<T, TReturn, TNext>;
    drop(limit: number): Generator<T, TReturn, TNext>;
    flatMap<R = T>(mapper: (value: T) => Iterator<R>): Generator<R, TReturn, TNext>;
    forEach(fn: (value: T) => void): void;
    toArray(): T[];
    reduce(reducer: (previousValue: T, currentValue: T) => T): T;
    reduce(reducer: (previousValue: T, currentValue: T) => T, initialValue: T): T;
    reduce<U>(reducer: (previousValue: U, currentValue: T) => U, initialValue: U): U;
    some(fn: (value: T) => unknown): boolean;
    every(fn: (value: T) => unknown): boolean;
    find(fn: (value: T) => unknown): T;
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}
interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    map<R = T>(mapper: (value: T) => R): AsyncGenerator<R, TReturn, TNext>;
    filter(filterer: (value: T) => boolean): AsyncGenerator<T, TReturn, TNext>;
    filter<R extends T = T>(filterer: (value: T) => value is R): AsyncGenerator<R, TReturn, TNext>;
    asIndexedPairs(): AsyncGenerator<readonly [number, T], TReturn, TNext>;
    take(limit: number): AsyncGenerator<T, TReturn, TNext>;
    drop(limit: number): AsyncGenerator<T, TReturn, TNext>;
    flatMap<R = T>(mapper: (value: T) => PromiseLike<AsyncIterator<R> | Iterator<R>> | AsyncIterator<R> | Iterator<R>): AsyncGenerator<R, TReturn, TNext>;
    forEach(fn: (value: T) => void): Promise<void>;
    toArray(): Promise<T[]>;
    reduce(reducer: (previousValue: T, currentValue: T) => T): Promise<T>;
    reduce(reducer: (previousValue: T, currentValue: T) => T | PromiseLike<T>, initialValue: T): Promise<T>;
    reduce<U>(reducer: (previousValue: U, currentValue: T) => U | PromiseLike<U>, initialValue: U): Promise<U>;
    some(fn: (value: T) => unknown | PromiseLike<unknown>): Promise<boolean>;
    every(fn: (value: T) => unknown | PromiseLike<unknown>): Promise<boolean>;
    find(fn: (value: T) => unknown | PromiseLike<unknown>): Promise<T>;
    [Symbol.asyncIterator](): AsyncIterator<T, TReturn, TNext>;
}
interface IteratorConstructor<T = unknown, TReturn = any, TNext = undefined> {
    prototype: Iterator<T, TReturn, TNext>;
    new(): Iterator<T, TReturn, TNext>;
    from<T>(iterable: Iterable<T>): Iterator<T>;
}
interface AsyncIteratorConstructor<T = unknown, TReturn = any, TNext = undefined> {
    prototype: AsyncIterator<T, TReturn, TNext>;
    new(): AsyncIterator<T, TReturn, TNext>;
    from<T>(iterable: AsyncIterable<T> | Iterable<T>): AsyncIterator<T>;
}
// @ts-ignore
var Iterator = function Iterator() { } as IteratorConstructor;
// @ts-ignore
var AsyncIterator = function AsyncIterator() { } as AsyncIteratorConstructor;
((self, u?: undefined) => {
    function* noop() { }
    async function* asyncNoop() { }
    const ToInteger = (argument: number) => {
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
    }
    const assert = (iterator: any) => {
        if (iterator === null || iterator === u) throw typeerror($reasons[1]);
        const next = iterator.next;
        if (!isCallable(next)) throw typeerror(next + $reasons[0]);
        return next;
    }
    const IteratorClose = (iterator: Iterator, value: any) => {
        const $$return = iterator.return;
        if ($$return !== u) call($$return, iterator);
        throw value;
    }
    const AsyncIteratorClose = async (iterator: AsyncIterator<unknown>, value: any) => {
        const $$return = iterator.return;
        if ($$return !== u) await call($$return, iterator);
        throw value;
    }
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
    const reason = method => `Method WrapForValidIteratorPrototype.${ method } called on incompatible receiver `
    const WrapForValidIteratorPrototype = <T>(iterable: any, next: any) => {
        var object = {
            next(value: unknown) {
                let O = this;
                if (object !== O) throw typeerror(reason("next") + O);
                return 0 in arguments ? call(next, iterable, value) : call(next, iterable);
            },
            return(value: unknown) {
                let O = this;
                if (object !== O) throw typeerror(reason("return") + O);
                let $$return = iterable["return"];
                return { value: $$return !== u ? call($$return, iterable) : value, done: true };
            },
            throw(value) {
                let O = this;
                if (object !== O) throw typeerror(reason("throw") + O);
                let $$throw = O["throw"];
                if ($$throw === u) {
                    throw value;
                } else {
                    return call($$throw, iterable, value);
                }
            }
        }
        Object.setPrototypeOf(object, Iterator.prototype);
        return object as Iterator<T>;
    }

    const WrapForValidAsyncIteratorPrototype = <T>(iterable: any, next: any) => {
        var object = {
            async next(value: unknown) {
                let O = this;
                if (object !== O) throw typeerror(reason("next") + O);
                return 0 in arguments ? await call(next, iterable, value) : await call(next, iterable);
            },
            async return(value: unknown) {
                let O = this;
                if (object !== O) throw typeerror(reason("return") + O);
                let $$return = iterable["return"];
                return { value: $$return !== u ? await call($$return, iterable) : value, done: true };
            },
            async throw(value: unknown) {
                let O = this;
                if (object !== O) throw typeerror(reason("throw") + O);
                let $$throw = O["throw"];
                if ($$throw === u) {
                    throw value;
                } else {
                    return await call($$throw, iterable, value);
                }
            }
        }
        Object.setPrototypeOf(object, AsyncIterator.prototype);
        return object as AsyncIterator<T>;
    }
    const { floor, abs } = Math;
    const { getPrototypeOf, defineProperty, getOwnPropertyNames } = Object;
    const typeerror = TypeError;
    const $reasons = [" is not function"] as string[];
    type AnyFunction = (...args: any[]) => any;
    const isCallable = <T extends AnyFunction>(fn: any): fn is T => typeof fn === "function";
    const assertCallable: (fn: any) => asserts fn is Function = (fn) => {
        if (!isCallable(fn)) throw typeerror(fn + "is not callable");
    };
    const _call = noop.call as Function;
    const call = _call.bind(_call) as <T extends AnyFunction>(fn: T, thisArg?: ThisParameterType<T> | null, ...args: Parameters<T>) => ReturnType<T>;
    const SymbolToStringTag = Symbol.toStringTag;
    const GeneratorPrototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(noop())));
    const AsyncGeneratorPrototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(asyncNoop())));
    const polyfill = (constructor: any, prototype: any, klass: any) => {
        prototype.constructor = constructor;
        constructor.prototype = prototype;
        if (SymbolToStringTag != u) defineProperty(prototype, SymbolToStringTag, { value: constructor.name, configurable: true });
        for (const key of getOwnPropertyNames(klass.prototype)) {
            defineProperty(prototype, key, {
                value: klass.prototype[key],
                writable: true,
                configurable: true
            });
        }
        self[constructor.name] = constructor;
    }
    Iterator.from = function <T>(O: any) {
        var object = Object(O);
        var usingIterator = object[Symbol.iterator];
        var iteratorRecord;
        if (usingIterator != u) {
            iteratorRecord = call(usingIterator, object);
            if (iteratorRecord instanceof Iterator) return iteratorRecord as Iterator<T>;
        } else iteratorRecord = object;
        return WrapForValidIteratorPrototype<T>(iteratorRecord, assert(iteratorRecord));
    };
    AsyncIterator.from = function <T>(O: any) {
        var object = Object(O);
        var usingIterator = object[Symbol.asyncIterator] ?? object[Symbol.iterator] ?? object['@@iterator'];
        var asyncIteratorRecord;
        if (usingIterator != u) {
            asyncIteratorRecord = call(usingIterator, object);
            if (asyncIteratorRecord instanceof AsyncIterator) return asyncIteratorRecord as AsyncIterator<T>;
        } else asyncIteratorRecord = object;
        return WrapForValidAsyncIteratorPrototype<T>(asyncIteratorRecord, assert(asyncIteratorRecord));
    };
    polyfill(Iterator, GeneratorPrototype, class Iterator<T = unknown, TReturn = any, TNext = undefined> {
        next!: IteratorNext<T, TNext, TReturn>;
        return!: (value: TReturn) => IteratorResult<T, TReturn>;
        throw!: (e?: any) => IteratorResult<T, TReturn>;
        *map<R>(mapper: (value: T) => R) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            assertCallable(mapper);
            let lastValue: TNext;
            try {
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield mapper(next.value as T);
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        *filter(filterer: (value: T) => boolean) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, void, never>;
            assertCallable(filterer);
            let lastValue: void;
            try {
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done) return;
                    const value = next.value as T;
                    const selector = filterer(value);
                    if (selector) lastValue = yield value as T;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        *take(limit: number) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            let remaining = ToInteger(limit);
            let lastValue: TNext;
            try {
                while (remaining--) {
                    const next = call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield next.value as T;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        *drop(limit: number) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            let remaining = ToInteger(limit);
            let lastValue: TNext;
            try {
                while (remaining--) {
                    if (call(_next, self, lastValue).done) return;
                }
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield next.value as T;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        *asIndexedPairs() {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            let lastValue: TNext, index = 0;
            try {
                while (1) {
                    const next = call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield [index++, next.value] as readonly [number, T];
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        *flatMap<R>(mapper: (value: T) => globalThis.Iterator<R, TReturn, TNext>): Generator<R, TReturn, TNext> {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            assertCallable(mapper);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done) return;
                    // Issue #114 flatMap should act like it does a `yield *` on each iterable
                    // https://github.com/tc39/proposal-iterator-helpers/issues/114
                    yield* mapper(next.value as T);
                    // const innerIterator = mapper(next.value as T)[Symbol.iterator]();
                    // const __next = innerIterator.next;
                    // let innerAlive = true;
                    // while (innerAlive) {
                    //     const innerNext = call(__next, innerIterator);
                    //     if (innerNext.done) innerAlive = false;
                    //     else yield innerNext.value as R;
                    // }
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        reduce(reducer: (...args: any[]) => void, initialValue?: unknown) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            let accumulator = initialValue;
            assertCallable(reducer);
            if (!(1 in arguments)) { // It's the only way to check if initialValue is not present
                let __next = call(_next, self);
                if (__next.done) {
                    throw typeerror($reasons[3]);
                }
                accumulator = __next.value;
            }
            while (1) {
                const __next = call(_next, self);
                if (__next.done) return accumulator;
                accumulator = reducer(accumulator, __next.value);
            }
        }
        toArray() {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            let array = [];
            let index = 0;
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done) return array;
                    array[index] = next.value;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        forEach(fn: (value: T) => void) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done) return;
                    fn(next.value as T);
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        some(fn: (value: T) => boolean) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done) return false;
                    if (fn(next.value as T)) return true;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        every(fn: (value: T) => boolean) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done) return true;
                    if (!fn(next.value as T)) return false;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        find(fn: (value: T) => any) {
            let self = this;
            let _next = assert(self) as IteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = call(_next, self);
                    if (next.done) return;
                    const value = next.value as T;
                    if (!fn(value)) return value;
                }
            } catch (error) {
                IteratorClose(self, error);
            }
        }
        [Symbol.iterator]!: () => this;
        readonly [Symbol.toStringTag]!: "Iterator";
    });
    polyfill(AsyncIterator, AsyncGeneratorPrototype, class AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
        next!: AsyncIteratorNext<T, TNext, TReturn>;
        return!: (value: TReturn | PromiseLike<TReturn>) => Promise<IteratorResult<T, TReturn>>;
        throw!: (e?: any) => Promise<IteratorResult<T, TReturn>>;
        ["constructor"] = self.AsyncIterator;
        async *map<R>(mapper: (value: T) => R | PromiseLike<R>) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(mapper);
            let lastValue: TNext;
            try {
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield mapper(next.value as T);
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *filter(filterer: (value: T) => boolean | PromiseLike<boolean>) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(filterer);
            let lastValue: TNext;
            try {
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done) return;
                    const value = next.value as T;
                    const selector = await filterer(value);
                    if (selector) lastValue = yield value as T;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *take(limit: number) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            let remaining = ToInteger(limit);
            let lastValue: TNext;
            try {
                while (remaining--) {
                    const next = await call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield next.value as T;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *drop(limit: number) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            let remaining = ToInteger(limit);
            let lastValue: TNext;
            try {
                while (remaining--) {
                    if ((await call(_next, self, lastValue)).done) return;
                }
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield next.value as T;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *asIndexedPairs() {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            let lastValue: TNext, index = 0;
            try {
                while (1) {
                    const next = await call(_next, self, lastValue);
                    if (next.done) return;
                    lastValue = yield [index++, next.value] as readonly [number, T];
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async *flatMap<R>(mapper: (value: T) => PromiseLike<globalThis.AsyncIterator<R, TReturn, TNext> | globalThis.Iterator<R, TReturn, TNext>> | globalThis.AsyncIterator<R, TReturn, TNext> | globalThis.Iterator<R, TReturn, TNext>): AsyncGenerator<R, TReturn, TNext> {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(mapper);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done) return;
                    // Issue #114 flatMap should act like it does a `yield *` on each iterable
                    // https://github.com/tc39/proposal-iterator-helpers/issues/114
                    yield* await mapper(next.value as T);
                    // const innerIterator = mapper(next.value as T)[Symbol.iterator]();
                    // const __next = innerIterator.next;
                    // let innerAlive = true;
                    // while (innerAlive) {
                    //     const innerNext = call(__next, innerIterator);
                    //     if (innerNext.done) innerAlive = false;
                    //     else yield innerNext.value as R;
                    // }
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async reduce(reducer: (...args: any[]) => void | PromiseLike<void>, initialValue?: unknown) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            let accumulator = initialValue;
            assertCallable(reducer);
            try {
                if (!(1 in arguments)) { // It's the only way to check if initialValue is not present
                    let __next = await call(_next, self);
                    if (__next.done) {
                        throw typeerror($reasons[3]);
                    }
                    accumulator = __next.value;
                }
                while (1) {
                    const __next = await call(_next, self);
                    if (__next.done) return accumulator;
                    accumulator = await reducer(accumulator, __next.value);
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async toArray() {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            let array = [];
            let index = 0;
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done) return array;
                    array[index] = next.value;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async forEach(fn: (value: T) => void | Promise<void>) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done) return;
                    await fn(next.value as T);
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async some(fn: (value: T) => unknown) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done) return false;
                    if (fn(next.value as T)) return true;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async every(fn: (value: T) => unknown) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done) return true;
                    if (!fn(next.value as T)) return false;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        async find(fn: (value: T) => any) {
            let self = this;
            let _next = assert(self) as AsyncIteratorNext<T, TNext, TReturn>;
            assertCallable(fn);
            try {
                while (1) {
                    const next = await call(_next, self);
                    if (next.done) return;
                    const value = next.value as T;
                    if (!fn(value)) return value;
                }
            } catch (error) {
                await AsyncIteratorClose(self, error);
            }
        }
        [Symbol.asyncIterator]!: () => this;
        readonly [Symbol.toStringTag]!: "AsyncIterator";
    });
    type IteratorNext<T, TNext, TReturn> = (...args: [] | [value: TNext]) => IteratorResult<T, TReturn>;
    type AsyncIteratorNext<T, TNext, TReturn> = (...args: [] | [value: TNext]) => Promise<IteratorResult<T, TReturn>>;
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
    return global as typeof globalThis;
}()));
