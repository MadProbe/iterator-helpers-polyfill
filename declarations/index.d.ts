/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />

declare type _Awaitable<T> = PromiseLike<T> | T;
declare type _IteratorLike<T = unknown, TReturn = any, TNext = undefined> = Iterator<T, TReturn, TNext> | Iterable<T>;
declare type _AsyncIteratorLike<T = unknown, TReturn = any, TNext = undefined> = AsyncIterator<T, TReturn, TNext> | AsyncIterable<T> | _IteratorLike<_Awaitable<T>, TReturn, TNext>;

declare global {
    interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
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
        [Symbol.iterator](): Iterator<T, TReturn, TNext>;
    }
    interface AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
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
        [Symbol.asyncIterator](): AsyncIterator<T, TReturn, TNext>;
    }
    interface IteratorConstructor {
        readonly prototype: Iterator;
        new <T = unknown, TReturn = any, TNext = undefined>(): Iterator<T, TReturn, TNext>;
        from<T>(iterable: _IteratorLike<T>): Iterator<T>;
    }
    interface AsyncIteratorConstructor {
        readonly prototype: AsyncIterator;
        new <T = unknown, TReturn = any, TNext = undefined>(): AsyncIterator<T, TReturn, TNext>;
        from<T>(iterable: _AsyncIteratorLike<T>): AsyncIterator<T>;
    }
    var Iterator: IteratorConstructor;
    var AsyncIterator: AsyncIteratorConstructor;
}

// Additional features available to polyfill (TODO)

declare type _MapIterator<A extends _RA<_IteratorLike<unknown>>> = A extends readonly [] ? A : A extends readonly [infer R, ...(infer Rest)] ?
    [_INR<R>, ..._MapIterator<Rest extends _IteratorLike<unknown>[] ? Rest : []>] : A extends _RA<infer I> ? _INR<I>[] : [];
declare type _MapAsyncIterator<A extends _RA<_AsyncIteratorLike<unknown>>> = A extends readonly [] ? A : A extends readonly [infer R, ...(infer Rest)] ?
    [_INR<R>, ..._MapIterator<Rest extends _IteratorLike<unknown>[] ? Rest : []>] : A extends _RA<infer I> ? _INR<I>[] : [];
/** IteratorNextResult */
declare type _INR<R> = R extends _IteratorLike<infer I> ? I : never;
declare type _RA<T> = readonly T[];
declare type _UnifyNexts<A> = A extends _RA<_AsyncIteratorLike<unknown, unknown, infer N>> ? N : never

// elegant solution from https://deno.land/std@0.107.0/async/tee.ts
// licensed by same lisence as used in this project
// license can be found here: https://deno.land/std@0.107.0/LICENSE
// ::start
declare type _Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
declare type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>;
// ::end

declare global {
    interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
        /** @note <TNext> value is used only when the `next` method of `this` iterator is actually called */
        tee<N extends number = 2>(count?: N): _Tuple<Generator<T, TReturn, TNext>, N>;
        zip<A extends _RA<_IteratorLike<unknown>>>(...iterators: A): Generator<[T, ..._MapIterator<A>], void, _UnifyNexts<A>>;
        skip(count: number): Generator<T, void, TNext>;
        chain<A extends _RA<_IteratorLike<unknown>>>(...iterators: A): Generator<T | A extends _RA<_IteratorLike<infer A>> ? A : never, void, _UnifyNexts<A>>;
        starMap<S>(fn: (...args: T extends unknown[] ? T : T extends _IteratorLike<infer I> ? I[] : never) => S): Generator<S, void, TNext>;
        skipWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        takeWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        dropWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        zipLongest<A extends _RA<_IteratorLike<unknown>>>(...iterators: A): Generator<[T, ..._MapIterator<A>], void, _UnifyNexts<A>>;
    }

    interface AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
        zip<A extends _RA<_AsyncIteratorLike<unknown>>>(...iterators: A): AsyncGenerator<[T, ..._MapAsyncIterator<A>], void, _UnifyNexts<A>>;
        skip(count: number): AsyncGenerator<T, void, TNext>;
        chain<A extends _RA<_AsyncIteratorLike<unknown>>>(...iterators: A): AsyncGenerator<T | (A extends _RA<_AsyncIteratorLike<infer A>> ? A : never), void, _UnifyNexts<A>>;
        entries(): AsyncGenerator<readonly [number, T], void, TNext>;
        starMap<S>(fn: (...args: T extends unknown[] ? T : T extends _IteratorLike<infer I> ? I[] : never) => _Awaitable<S>): AsyncGenerator<S, void, TNext>;
        skipWhile(fn: (item: T) => unknown): AsyncGenerator<T, void, TNext>;
        takeWhile(fn: (item: T) => unknown): AsyncGenerator<T, void, TNext>;
        dropWhile(fn: (item: T) => unknown): AsyncGenerator<T, void, TNext>;
        zipLongest<A extends _RA<_AsyncIteratorLike<unknown>>>(...iterators: A): AsyncGenerator<[T, ..._MapAsyncIterator<A>], void, _UnifyNexts<A>>;
    }
}

declare type keys = "zip" | "chain" | "count" | "cycle" | "skip" | "enties" | "starMap" | "dropWhile" | "partition" | "skipWhile" | "takeWhile" | "zipLongest";
declare class Config {
    additionals: boolean & Record<keys, boolean>;
    polyfilled: boolean & Record<Exclude<keyof Iterator, keys>, boolean>;
}
export const config: Config;