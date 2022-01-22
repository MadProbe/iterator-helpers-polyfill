/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />
// I don't want to change types of built-ins only because of this rule
/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type _Awaitable<T> = PromiseLike<T> | T;

export declare type _IteratorLike<T = any, TReturn = any, TNext = undefined> = Iterator<T, TReturn, TNext> | _Iterable<T, TReturn, TNext>;

export declare type _AsyncIteratorLike<T = any, TReturn = any, TNext = undefined> = AsyncIterator<T, TReturn, TNext> | _AsyncIterable<T, TReturn, TNext> | _IteratorLike<Promise<T>, TReturn, TNext> | _IteratorLike<T, TReturn, TNext>;

// Unused type parameters are intentional!
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _Iterable<T = unknown, TReturn = any, TNext = undefined> = Iterable<T>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _AsyncIterable<T = unknown, TReturn = any, TNext = undefined> = AsyncIterable<T>

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
        toArray(): Promise<_RA<T>>;
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
        range(start: number, end?: number, step?: number): Generator<number>;
    }
    interface AsyncIteratorConstructor {
        readonly prototype: AsyncIterator;
        new <T = unknown, TReturn = any, TNext = undefined>(): AsyncIterator<T, TReturn, TNext>;
        from<T>(iterable: _AsyncIteratorLike<T>): AsyncIterator<T>;
        range(start: number, end?: number, step?: number): AsyncGenerator<number>;
    }
    var Iterator: IteratorConstructor;
    var AsyncIterator: AsyncIteratorConstructor;
}

// Additional features available to polyfill (TODO)

declare type _MapIterator<A extends _RA<_IteratorLike>> = A extends readonly [] ? A : A extends readonly [infer R, ...(infer Rest)] ?
    readonly [_INR<R>, ..._MapIterator<Rest extends _RA<_IteratorLike> ? Rest : readonly []>] : A extends _RA<infer I> ? _RA<_INR<I>> : readonly [];
declare type _MapAsyncIterator<A extends _RA<_AsyncIteratorLike>> = A extends readonly [] ? A : A extends readonly [infer R, ...(infer Rest)] ?
    readonly [_INR<R>, ..._MapIterator<Rest extends _RA<_AsyncIteratorLike> ? Rest : readonly []>] : A extends _RA<infer I> ? _RA<_INR<I>> : readonly [];
/** IteratorNextResult */
declare type _INR<R> = R extends _AsyncIteratorLike<infer I> ? I : never;
declare type _RA<T = unknown> = readonly T[];
declare type _UnifyNexts<A> = A extends _RA<_AsyncIteratorLike<unknown, unknown, infer N>> ? N : never;

// elegant solution from https://deno.land/std@0.107.0/async/tee.ts
// licensed by same lisence as used in this project
// license can be found here: https://deno.land/std@0.107.0/LICENSE
// modified by me to confirm my needs
// ::start
declare type _Tuple<T, N extends number> = N extends N ? number extends N ? _RA<T> : _TupleOf<T, N, readonly []> : never;
declare type _TupleOf<T, N extends number, R extends _RA> = R["length"] extends N ? R : _TupleOf<T, N, readonly [T, ...R]>;
// ::end
declare type _Length<A extends _RA> = A["length"] extends number ? A["length"] : never;
declare type _IRANR<A extends _RA<_AsyncIteratorLike>, T = never> = A extends _RA<_AsyncIteratorLike<infer V>> ? readonly [] extends A ? T : [] extends A ? T : T | V : T;
declare type _IfElse<C extends boolean, T, F> = true extends C ? T : F;
// Testing purposes & indicator that something is broken
type _ = IterableIterator<Iterator<string>> extends _IteratorLike<infer V> ? V : never;
type _StarMap<T, TNext, C extends boolean> = <S>(fn: (...args: T extends _IteratorLike<infer V> ? T extends _RA ? T : readonly V[] : never) => _IfElse<C, _Awaitable<S>, S>) => 
    _IfElse<C, AsyncGenerator<S, void, TNext>, Generator<S, void, TNext>>;

declare global {
    interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
        roundrobin<A extends _RA<_IteratorLike>>(...iterators: A): Generator<_IRANR<A, T>, void, _UnifyNexts<A>>;
        heads<A extends _RA<_IteratorLike>>(...iterators: A): Generator<_Tuple<_IRANR<A, T>, _Length<readonly [T, ...A]>>, void>;
        filterMap<S, E = undefined>(fn: (item: T) => S | E, excludedValue?: E): S;
        intersection<S>(generator: Generator<S>): Generator<S & T, void>;
        intersperse<S>(item: S): Generator<T | S>;
        /** @note <TNext> value is used only when the `next` method of `this` iterator is actually called */
        tee<N extends number = 2>(count?: N): _Tuple<Generator<T, TReturn, TNext>, N>;
        zip<A extends _RA<_IteratorLike>>(...iterators: A): Generator<readonly [T, ..._MapIterator<A>], void, _UnifyNexts<A>>;
        skip(count: number): Generator<T, void, TNext>;
        chain<A extends _RA<_IteratorLike>>(...iterators: A): Generator<_IRANR<A, T>, void, _UnifyNexts<A>>;
        cycle<N extends number = 2>(times: N): AsyncGenerator<T, void, TNext>;
        starMap: _StarMap<T, TNext, false>;
        skipWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        takeWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        dropWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        zipLongest<A extends _RA<_IteratorLike>>(...iterators: A): Generator<readonly [T, ..._MapIterator<A>], void, _UnifyNexts<A>>;
    }

    interface AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
        tee<N extends number = 2>(count?: N): _Tuple<AsyncGenerator<T, TReturn, TNext>, N>;
        zip<A extends _RA<_AsyncIteratorLike>>(...iterators: A): AsyncGenerator<readonly [T, ..._MapAsyncIterator<A>], void, _UnifyNexts<A>>;
        skip(count: number): AsyncGenerator<T, void, TNext>;
        chain<A extends _RA<_AsyncIteratorLike>>(...iterators: A): AsyncGenerator<_IRANR<A, T>, void, _UnifyNexts<A>>;
        cycle<N extends number = 2>(times: N): AsyncGenerator<T, void, TNext>;
        entries(): AsyncGenerator<readonly [number, T], void, TNext>;
        starMap: _StarMap<T, TNext, true>
        skipWhile(fn: (item: T) => unknown): AsyncGenerator<T, void, TNext>;
        takeWhile(fn: (item: T) => unknown): AsyncGenerator<T, void, TNext>;
        dropWhile(fn: (item: T) => unknown): AsyncGenerator<T, void, TNext>;
        zipLongest<A extends _RA<_AsyncIteratorLike>>(...iterators: A): AsyncGenerator<readonly [T, ..._MapAsyncIterator<A>], void, _UnifyNexts<A>>;
    }
}

// polyfilled ones are easier to manage since i don't need to type another one proposed additional method here
declare type keys = "asIndexedPairs" | "drop" | "every" | "filter" | "filter" | "find" | "flatMap" | "forEach" | "map" | "reduce" | "reduce" | "reduce" | "some" | "take" | "toArray";
declare class Config {
    public additionals: boolean & Record<Exclude<keyof Iterator, keys | typeof Symbol.iterator | "next" | "throw" | "return">, boolean>;
    public polyfilled: boolean & Record<keys, boolean>;
}
export const config: Config;
