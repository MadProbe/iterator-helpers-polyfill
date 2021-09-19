/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />

declare type _Awaitable<T> = PromiseLike<T> | T;
declare type _IteratorLike<T = unknown, TReturn = any, TNext = undefined> = Iterator<T, TReturn, TNext> | Iterable<T>;
declare type _AsyncIteratorLike<T = unknown, TReturn = any, TNext = undefined> = AsyncIterator<T, TReturn, TNext> | AsyncIterable<T> | _IteratorLike<_Awaitable<T>, TReturn, TNext>;
declare interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
    map<R = T>(mapper: (value: T) => R): Generator<R, void, TNext>;
    filter(filterer: (value: T) => unknown): Generator<T, void, TNext>;
    filter<R extends T = T>(filterer: (value: T) => value is R): Generator<R, void, TNext>;
    asIndexedPairs(): Generator<readonly [number, T], void, TNext>;
    take(limit: number): Generator<T, void, TNext>;
    drop(limit: number): Generator<T, void, TNext>;
    flatMap<R = T>(mapper: (value: T) => Iterator<R>): Generator<R, void, never>;
    forEach(fn: (value: T) => void): void;
    toArray(): T[];
    reduce(reducer: (previousValue: T, currentValue: T) => T): T;
    reduce(reducer: (previousValue: T, currentValue: T) => T, initialValue: T): T;
    reduce<U>(reducer: (previousValue: U, currentValue: T) => U, initialValue: U): U;
    some(fn: (value: T) => unknown): boolean;
    every(fn: (value: T) => unknown): boolean;
    find(fn: (value: T) => unknown): T;
    [Symbol.iterator](): this;
}
declare interface AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
    map<R = T>(mapper: (value: T) => _Awaitable<R>): AsyncGenerator<R, void, TNext>;
    filter(filterer: (value: T) => _Awaitable<unknown>): AsyncGenerator<T, void, TNext>;
    asIndexedPairs(): AsyncGenerator<readonly [number, T], void, TNext>;
    take(limit: number): AsyncGenerator<T, void, TNext>;
    drop(limit: number): AsyncGenerator<T, void, TNext>;
    flatMap<R = T>(mapper: (value: T) => _Awaitable<_AsyncIteratorLike<R>>): AsyncGenerator<R, void, never>;
    forEach(fn: (value: T) => _Awaitable<unknown>): Promise<void>;
    toArray(): Promise<T[]>;
    reduce(reducer: (previousValue: T, currentValue: T) => _Awaitable<T>): Promise<T>;
    reduce(reducer: (previousValue: T, currentValue: T) => _Awaitable<T>, initialValue: T): Promise<T>;
    reduce<U>(reducer: (previousValue: U, currentValue: T) => _Awaitable<U>, initialValue: U): Promise<U>;
    some(fn: (value: T) => _Awaitable<unknown>): Promise<boolean>;
    every(fn: (value: T) => _Awaitable<unknown>): Promise<boolean>;
    find(fn: (value: T) => _Awaitable<unknown>): Promise<T>;
    [Symbol.asyncIterator](): this;
}
declare interface IteratorConstructor {
    prototype: Iterator;
    new <T = unknown, TReturn = any, TNext = undefined>(): Iterator<T, TReturn, TNext>;
    from<T>(iterable: _IteratorLike<T>): Iterator<T>;
}
declare interface AsyncIteratorConstructor {
    prototype: AsyncIterator;
    new <T = unknown, TReturn = any, TNext = undefined>(): AsyncIterator<T, TReturn, TNext>;
    from<T>(iterable: _AsyncIteratorLike<T>): AsyncIterator<T>;
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
