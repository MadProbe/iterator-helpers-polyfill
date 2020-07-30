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
    new (): Iterator<T, TReturn, TNext>;
    from<T>(iterable: Iterable<T> | Iterator<T>): Iterator<T>;
}
interface AsyncIteratorConstructor<T = unknown, TReturn = any, TNext = undefined> {
    prototype: AsyncIterator<T, TReturn, TNext>;
    new (): AsyncIterator<T, TReturn, TNext>;
    from<T>(iterable: AsyncIterable<T> | AsyncIterator<T> | Iterable<T> | Iterator<T>): AsyncIterator<T>;
}
declare var Iterator: IteratorConstructor<unknown, any, undefined>;
declare var AsyncIterator: AsyncIteratorConstructor<unknown, any, undefined>;
