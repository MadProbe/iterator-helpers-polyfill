/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />

declare type _Awaitable<T> = PromiseLike<T> | T;
declare type _AsyncIteratorLike<T, TReturn = any, TNext = undefined> = AsyncIterator<T, TReturn, TNext> | Iterator<_Awaitable<T>>;
interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
    map<R = T>(mapper: (value: T) => R): Generator<R, void, TNext>;
    filter(filterer: (value: T) => boolean): Generator<T, void, TNext>;
    filter<R extends T = T>(filterer: (value: T) => value is R): Generator<R, void, TNext>;
    asIndexedPairs(): Generator<readonly [number, T], void, TNext>;
    take(limit: number): Generator<T, void, TNext>;
    drop(limit: number): Generator<T, void, TNext>;
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
    map<R = T>(mapper: (value: T) => _Awaitable<R>): AsyncGenerator<R, void, TNext>;
    filter(filterer: (value: T) => _Awaitable<boolean>): AsyncGenerator<T, void, TNext>;
    asIndexedPairs(): AsyncGenerator<readonly [number, T], void, TNext>;
    take(limit: number): AsyncGenerator<T, void, TNext>;
    drop(limit: number): AsyncGenerator<T, void, TNext>;
    flatMap<R = T>(mapper: (value: T) => _Awaitable<_AsyncIteratorLike<R>>): AsyncGenerator<R, void, undefined>;
    forEach(fn: (value: T) => _Awaitable<void>): Promise<void>;
    toArray(): Promise<T[]>;
    reduce(reducer: (previousValue: T, currentValue: T) => _Awaitable<T>): Promise<T>;
    reduce(reducer: (previousValue: T, currentValue: T) => _Awaitable<T>, initialValue: T): Promise<T>;
    reduce<U>(reducer: (previousValue: U, currentValue: T) => _Awaitable<U>, initialValue: U): Promise<U>;
    some(fn: (value: T) => _Awaitable<unknown>): Promise<boolean>;
    every(fn: (value: T) => _Awaitable<unknown>): Promise<boolean>;
    find(fn: (value: T) => _Awaitable<unknown>): Promise<T>;
    [Symbol.asyncIterator](): AsyncIterator<T, TReturn, TNext>;
}
interface IteratorConstructor {
    prototype: Iterator<unknown, any, undefined>;
    new <T = unknown, TReturn = any, TNext = undefined>(): Iterator<T, TReturn, TNext>;
    from<T>(iterable: Iterable<T> | Iterator<T>): Iterator<T>;
}
interface AsyncIteratorConstructor {
    prototype: AsyncIterator<unknown, any, undefined>;
    new <T = unknown, TReturn = any, TNext = undefined>(): AsyncIterator<T, TReturn, TNext>;
    from<T>(iterable: AsyncIterable<T> | AsyncIterator<T> | Iterable<_Awaitable<T>> | Iterator<_Awaitable<T>>): AsyncIterator<T>;
}
declare var Iterator: IteratorConstructor;
declare var AsyncIterator: AsyncIteratorConstructor;

// Additional features available to polyfill (TODO)

interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
    skip(count: number): Iterator<T, void, TNext>;
    skipWhile(fn: (item: T) => unknown): Iterator<T, void, TNext>;
    takeWhile(fn: (item: T) => unknown): Iterator<T, void, TNext>;
    dropWhile(fn: (item: T) => unknown): Iterator<T, void, TNext>;
    starMap<S>(fn: (...args: T extends unknown[] ? T : T extends Iterable<infer I> ? I[] : T extends Iterator<infer I> ? I[] : never) => S): Iterator<S, void, TNext>;
}
declare module "iterator-helpers-polyfill/additional" { }
