/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />
// I don't want to change types of built-ins only because of this rule
/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type _Awaitable<T> = PromiseLike<T> | T;

export declare type _IteratorLike<T = any, TReturn = any, TNext = undefined> = Iterator<T, TReturn, TNext> | _Iterable<T, TReturn, TNext>;

export declare type _AsyncIteratorLike<T = any, TReturn = any, TNext = undefined> = AsyncIterator<T, TReturn, TNext> | _AsyncIterable<T, TReturn, TNext> | _IteratorLike<Promise<T>, TReturn, TNext> | _IteratorLike<T, TReturn, TNext>;

// Unused type parameters are intentional!
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _Iterable<T = unknown, TReturn = any, TNext = undefined> = Iterable<T>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _AsyncIterable<T = unknown, TReturn = any, TNext = undefined> = AsyncIterable<T>;

declare global {
    interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
        map<R = T>(mapper: (value: T) => R): Generator<R, void, TNext>;
        filter<R extends T = T>(filterer: (value: T) => value is R): Generator<R, void, TNext>;
        filter(filterer: (value: T) => unknown): Generator<T, void, TNext>;
        asIndexedPairs(): Generator<readonly [number, T], void, TNext>;
        take(limit: number): Generator<T, void, TNext>;
        drop(limit: number): Generator<T, void, TNext>;
        flatMap<R = T, RNext = undefined>(mapper: (value: T) => Iterator<R, unknown, RNext>): Generator<R, void, RNext>;
        forEach(fn: (value: T) => void): void;
        toArray(): T[];
        reduce(reducer: (previousValue: T, currentValue: T) => T): T;
        reduce(reducer: (previousValue: T, currentValue: T) => T, initialValue: T): T;
        reduce<U>(reducer: (previousValue: U, currentValue: T) => U, initialValue: U): U;
        some(fn: (value: T) => unknown): boolean;
        every(fn: (value: T) => unknown): boolean;
        find(fn: (value: T) => unknown): T | undefined;
        [Symbol.iterator](): Iterator<T, TReturn, TNext>;
    }
    interface AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
        map<R = T>(mapper: (value: T) => _Awaitable<R>): AsyncGenerator<R, void, TNext>;
        filter<R extends T = T>(filterer: (value: T) => value is R): AsyncGenerator<R, void, TNext>;
        filter(filterer: (value: T) => _Awaitable<unknown>): AsyncGenerator<T, void, TNext>;
        asIndexedPairs(): AsyncGenerator<readonly [number, T], void, TNext>;
        take(limit: number): AsyncGenerator<T, void, TNext>;
        drop(limit: number): AsyncGenerator<T, void, TNext>;
        flatMap<R = T, RNext = undefined>(mapper: (value: T) => _Awaitable<_AsyncIteratorLike<R, unknown, RNext>>): AsyncGenerator<R, void, RNext>;
        forEach(fn: (value: T) => _Awaitable<unknown>): Promise<void>;
        toArray(): Promise<_RA<T>>;
        reduce(reducer: (previousValue: T, currentValue: T) => _Awaitable<T>): Promise<T>;
        reduce(reducer: (previousValue: T, currentValue: T) => _Awaitable<T>, initialValue: T): Promise<T>;
        reduce<U>(reducer: (previousValue: U, currentValue: T) => _Awaitable<U>, initialValue: U): Promise<U>;
        some(fn: (value: T) => _Awaitable<unknown>): Promise<boolean>;
        every(fn: (value: T) => _Awaitable<unknown>): Promise<boolean>;
        find(fn: (value: T) => _Awaitable<unknown>): Promise<T | undefined>;
        [Symbol.asyncIterator](): AsyncIterator<T, TReturn, TNext>;
    }
    interface IteratorConstructor {
        readonly prototype: Iterator;
        new <T = unknown, TReturn = any, TNext = undefined>(): Iterator<T, TReturn, TNext>;
        from<T>(iterable: _IteratorLike<T>): Iterator<T>;
        range(start: number, end?: number, step?: number, inclusive?: boolean): Generator<number>;
    }
    interface AsyncIteratorConstructor {
        readonly prototype: AsyncIterator;
        new <T = unknown, TReturn = any, TNext = undefined>(): AsyncIterator<T, TReturn, TNext>;
        from<T>(iterable: _AsyncIteratorLike<T>): AsyncIterator<T>;
        range(start: number, end?: number, step?: number, inclusive?: boolean): AsyncGenerator<number>;
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
declare type _UnifyNexts<A> = A extends _RA<_IteratorLike<unknown, unknown, infer N>> ? N : never;
declare type _UnifyAsyncNexts<A> = A extends _RA<_AsyncIteratorLike<unknown, unknown, infer N>> ? N : never;

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
type _SymmetricDifference<T> = <S>(iterable: _IteratorLike<S>) => Generator<Exclude<T, S> | Exclude<S, T>, void>;
type _SymmetricDifferenceAsync<T> = <S>(iterable: _AsyncIteratorLike<S>) => AsyncGenerator<Exclude<T, S> | Exclude<S, T>, void>;

type DecrementLoop<N extends number, R extends number> = _Tuple<0, (readonly [0, ..._Tuple<0, R>])["length"] & number> extends _Tuple<0, N> ? R: DecrementLoop<N, (readonly [0, ..._Tuple<0, R>])["length"] & number>;
type Decrement<N extends number> = number extends N ? number : DecrementLoop<N, 0>;
// type FlattenIterator<T, Depth extends number, Saved = never> = T extends string ? string : T extends _AsyncIteratorLike<infer V> ? number extends Depth ? 
//     FlattenIterator<V, Decrement<Depth>, T | Saved> : 0 extends Decrement<Depth> ? V | Saved : FlattenIterator<V, Decrement<Depth>, Saved> : T;
type FlattenIteratorLatter<T, Depth extends number, Saved = never> = T extends string ? (number extends Depth ? Saved | T : never) : T extends _IteratorLike<infer V> ? number extends Depth ? 
    T extends Saved ? Saved : FlattenIteratorLatter<V, number, T | Saved>
    : 0 extends Decrement<Depth> ? V | Saved : FlattenIteratorLatter<V, Decrement<Depth>, Saved> : T;
type FlattenIterator<T, Depth extends number, Saved = never> = T extends string ? (number extends Depth ? Saved | T : never) : T extends _IteratorLike<infer V> ? number extends Depth ? 
    T extends Saved ? Saved : FlattenIteratorLatter<V, number, Saved> | T
    : 0 extends Decrement<Depth> ? V | Saved : FlattenIteratorLatter<V, Decrement<Depth>, Saved> : T;
type FlattenAsyncIteratorLatter<T, Depth extends number, Saved = never> = T extends string ? (number extends Depth ? Saved | T : never) : T extends _AsyncIteratorLike<infer V> ? number extends Depth ? 
    T extends Saved ? Saved : FlattenAsyncIteratorLatter<V, number, T | Saved>
    : 0 extends Decrement<Depth> ? V | Saved : FlattenAsyncIteratorLatter<V, Decrement<Depth>, Saved> : T;
type FlattenAsyncIterator<T, Depth extends number, Saved = never> = T extends string ? (number extends Depth ? Saved | T : never) : T extends _AsyncIteratorLike<infer V> ? number extends Depth ? 
    T extends Saved ? Saved : FlattenAsyncIteratorLatter<V, number, Saved> | T
    : 0 extends Decrement<Depth> ? V | Saved : FlattenAsyncIteratorLatter<V, Decrement<Depth>, Saved> : T;

declare global {
    interface Iterator<T = unknown, TReturn = any, TNext = undefined> {
        enumerate(): Generator<readonly [number, T], void, TNext>;
        entries(): Generator<readonly [number, T], void, TNext>;
        roundrobin<A extends _RA<_IteratorLike>>(...iterables: A): Generator<_IRANR<A, T>, void, _UnifyNexts<A>>;
        heads<A extends _RA<_IteratorLike>>(...iterables: A): Generator<_Tuple<_IRANR<A, T>, _Length<readonly [T, ...A]>>, void>;
        flatten<Depth extends number = 1>(times?: Depth, options?: { keepStringsAsIs?: boolean }): Generator<FlattenIterator<T, Depth>, void>;
        filterMap<S, E = undefined>(fn: (item: T) => S | E, excludedValue?: E): S;
        groupBy<S extends PropertyKey>(fn: (item: T) => S): Record<S, T[]>;
        groupByToMap<S>(fn: (item: T) => S): Map<S, T[]>;
        symmetricDifference: _SymmetricDifference<T>;
        difference<S>(iterable: _IteratorLike<S>): Generator<Exclude<T, S>, void>;
        intersection<S>(iterable: _IteratorLike<S>): Generator<S & T, void>;
        intersperse<S>(item: S): Generator<T | S, void>;
        each(fn: (value: T) => void): Generator<T, void, TNext>;
        /** @note <TNext> value is used only when the `next` method of `this` iterator is actually called */
        tee<N extends number = 2>(count?: N): _Tuple<Generator<T, TReturn, TNext>, N>;
        zip<A extends _RA<_IteratorLike>>(...iterables: A): Generator<readonly [T, ..._MapIterator<A>], void, _UnifyNexts<A>>;
        skip(count: number): Generator<T, void, TNext>;
        contains(value: T): boolean;
        average(): number;
        max(): number;
        min(): number;
        count(): number;
        chunked<N extends number = 2>(times?: N): Generator<_Tuple<T, N>, void>;
        chain<A extends _RA<_IteratorLike | null | undefined>>(...iterables: A): Generator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>, void, _UnifyNexts<A>>;
        concat<A extends _RA<_IteratorLike | null | undefined>>(...iterables: A): Generator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>, void, _UnifyNexts<A>>;
        cycle<N extends number>(/** @default Infinity */ times?: N): Generator<T, void, TNext>;
        repeat<N extends number>(/** @default Infinity */ times?: N): Generator<T, void, TNext>;
        starMap: _StarMap<T, TNext, false>;
        skipWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        takeWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        dropWhile(fn: (item: T) => unknown): Generator<T, void, TNext>;
        zipLongest<A extends _RA<_IteratorLike>>(...iterables: A): Generator<readonly [T, ..._MapIterator<A>], void, _UnifyNexts<A>>;
        unique(): Generator<T, void>;
        uniqueJustseen(): Generator<T, void>;
        join<S extends string = ", ">(separator?: S): string;
        partition(filterer: (value: T) => unknown): _Tuple<Generator<T, TReturn, TNext>, 2>;
        partition<R extends T = T>(filterer: (value: T) => value is R): readonly [Generator<R, TReturn, TNext>, Generator<Exclude<T, R>, TReturn, TNext>];
    }

    interface AsyncIterator<T = unknown, TReturn = any, TNext = undefined> {
        entries(): AsyncGenerator<readonly [number, T], void, TNext>;
        enumerate(): AsyncGenerator<readonly [number, T], void, TNext>;
        roundrobin<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncGenerator<_IRANR<A, T>, void, _UnifyAsyncNexts<A>>;
        heads<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncGenerator<_Tuple<_IRANR<A, T>, _Length<readonly [T, ...A]>>, void>;
        flatten<Depth extends number = 1>(times?: Depth, options?: { keepStringsAsIs?: boolean }): AsyncGenerator<FlattenAsyncIterator<T, Depth>, void>; // TODO: Better typing
        filterMap<S, E = undefined>(fn: (item: T) => S | E, excludedValue?: E): S;
        groupBy<S extends PropertyKey>(fn: (item: T) => S): Promise<Record<S, T[]>>;
        groupByToMap<S>(fn: (item: T) => S): Promise<Map<S, T[]>>;
        symmetricDifference: _SymmetricDifferenceAsync<T>;
        difference<S>(iterable: _AsyncIteratorLike<S>): AsyncGenerator<Exclude<T, S>, void>;
        intersection<S>(iterable: _AsyncIteratorLike<S>): AsyncGenerator<S & T, void>;
        intersperse<S>(item: _Awaitable<S>): AsyncGenerator<T | S, void>;
        each(fn: (value: T) => _Awaitable<unknown>): AsyncGenerator<T, void, TNext>;
        tee<N extends number = 2>(count?: N): _Tuple<AsyncGenerator<T, TReturn, TNext>, N>;
        zip<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncGenerator<readonly [T, ..._MapAsyncIterator<A>], void, _UnifyAsyncNexts<A>>;
        skip(count: number): AsyncGenerator<T, void, TNext>;
        contains(value: T): Promise<boolean>;
        average(): Promise<number>;
        max(): Promise<number>;
        min(): Promise<number>;
        count(): Promise<number>;
        chunked<N extends number = 2>(times?: N): AsyncGenerator<_Tuple<T, N>, void>;
        chain<A extends _RA<_AsyncIteratorLike | null | undefined>>(...iterables: A): AsyncGenerator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>, void, _UnifyAsyncNexts<A>>;
        concat<A extends _RA<_AsyncIteratorLike | null | undefined>>(...iterables: A): AsyncGenerator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>, void, _UnifyAsyncNexts<A>>;
        cycle<N extends number>(/** @default Infinity */ times?: N): AsyncGenerator<T, void, TNext>;
        repeat<N extends number>(/** @default Infinity */ times?: N): AsyncGenerator<T, void, TNext>;
        starMap: _StarMap<T, TNext, true>;
        skipWhile(fn: (item: T) => _Awaitable<unknown>): AsyncGenerator<T, void, TNext>;
        takeWhile(fn: (item: T) => _Awaitable<unknown>): AsyncGenerator<T, void, TNext>;
        dropWhile(fn: (item: T) => _Awaitable<unknown>): AsyncGenerator<T, void, TNext>;
        zipLongest<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncGenerator<readonly [T, ..._MapAsyncIterator<A>], void, _UnifyAsyncNexts<A>>;
        unique(): AsyncGenerator<T, void>;
        uniqueJustseen(): AsyncGenerator<T, void>;
        join<S extends string = ", ">(separator?: S): Promise<string>;
        partition(filterer: (value: T) => _Awaitable<unknown>): _Tuple<AsyncGenerator<T, TReturn, TNext>, 2>;
        partition<R extends T = T>(filterer: (value: T) => value is R): readonly [AsyncGenerator<R, TReturn, TNext>, AsyncGenerator<Exclude<T, R>, TReturn, TNext>];
    }
}

// polyfilled ones are easier to manage since i don't need to type another one proposed additional method here
declare type keys = "asIndexedPairs" | "drop" | "every" | "filter" | "filter" | "find" | "flatMap" | "forEach" | "map" | "reduce" | "reduce" | "reduce" | "some" | "take" | "toArray";
declare class Config {
    public additionals: boolean & Record<Exclude<keyof Iterator, keys | typeof Symbol.iterator | "next" | "throw" | "return">, boolean>;
    public polyfilled: boolean & Record<keys, boolean>;
}
export const config: Config;

export const AsyncIterator: AsyncIteratorConstructor;

export const Iterator: IteratorConstructor;

/**
 * Injects `Iterator` and `AsyncIterator` constructors onto globalThis.
 */
export function installIntoGlobal(): void;
