/// <reference lib="es2015.generator" />
/// <reference lib="es2018.asyncgenerator" />
// I don't want to change types of built-ins only because of this rule
/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type _Awaitable<T> = PromiseLike<T> | T;

export declare type _IteratorSkeleton<T> = { next(value?: unknown): IteratorResult<T> };

export declare type _AsyncIteratorSkeleton<T> = { next(value?: unknown): PromiseLike<IteratorResult<T>> };

export declare type _IterableSkeleton<T> = { [Symbol.iterator](): _IteratorSkeleton<T> };

export declare type _AsyncIterableSkeleton<T> = { [Symbol.asyncIterator](): _AsyncIteratorSkeleton<T> };

export declare type _IteratorLike<T = any> = _IteratorSkeleton<T> | _IterableSkeleton<T>;

export declare type _AsyncIteratorLike<T = any> = _AsyncIteratorSkeleton<T> | _AsyncIterableSkeleton<T> | _IteratorLike<PromiseLike<T>> | _IteratorLike<T>;

declare global {
    interface Iterator<T> {
        map<R = T>(mapper: (value: T, index: number) => R): Iterator<R>;
        filter<R extends T = T>(filterer: (value: T, index: number) => value is R): Iterator<R>;
        filter(filterer: (value: T, index: number) => unknown): Iterator<T>;
        asIndexedPairs(): Iterator<readonly [number, T]>;
        take(limit: number): Iterator<T>;
        drop(limit: number): Iterator<T>;
        flatMap<R = T>(mapper: (value: T, index: number) => _IteratorLike<R>): Iterator<R>;
        forEach(fn: (value: T, index: number) => void): void;
        toArray(): T[];
        reduce(reducer: (previousValue: T, currentValue: T, index: number) => T): T;
        reduce(reducer: (previousValue: T, currentValue: T, index: number) => T, initialValue: T): T;
        reduce<U>(reducer: (previousValue: U, currentValue: T, index: number) => U, initialValue: U): U;
        some(fn: (value: T, index: number) => unknown): boolean;
        every(fn: (value: T, index: number) => unknown): boolean;
        find(fn: (value: T, index: number) => unknown): T | undefined;
        [Symbol.iterator](): Iterator<T>;
    }
    interface AsyncIterator<T> {
        map<R = T>(mapper: (value: T, index: number) => _Awaitable<R>): AsyncIterator<R>;
        filter<R extends T = T>(filterer: (value: T, index: number) => value is R): AsyncIterator<R>;
        filter(filterer: (value: T, index: number) => _Awaitable<unknown>): AsyncIterator<T>;
        asIndexedPairs(): AsyncIterator<readonly [number, T]>;
        take(limit: number): AsyncIterator<T>;
        drop(limit: number): AsyncIterator<T>;
        flatMap<R = T>(mapper: (value: T, index: number) => _Awaitable<_AsyncIteratorLike<R>>): AsyncIterator<R>;
        forEach(fn: (value: T, index: number) => _Awaitable<unknown>): Promise<void>;
        toArray(): Promise<_RA<T>>;
        reduce(reducer: (previousValue: T, currentValue: T, index: number) => _Awaitable<T>): Promise<T>;
        reduce(reducer: (previousValue: T, currentValue: T, index: number) => _Awaitable<T>, initialValue: T): Promise<T>;
        reduce<U>(reducer: (previousValue: U, currentValue: T, index: number) => _Awaitable<U>, initialValue: U): Promise<U>;
        some(fn: (value: T, index: number) => _Awaitable<unknown>): Promise<boolean>;
        every(fn: (value: T, index: number) => _Awaitable<unknown>): Promise<boolean>;
        find(fn: (value: T, index: number) => _Awaitable<unknown>): Promise<T | undefined>;
        [Symbol.asyncIterator](): AsyncIterator<T>;
    }
    interface IteratorConstructor {
        readonly prototype: Iterator<any>;
        new <T = unknown>(): Iterator<T>;
        from<T>(iterable: _IteratorLike<T>): Iterator<T>;
        range(start: number, end?: number, step?: number, inclusive?: boolean): Iterator<number>;
    }
    interface AsyncIteratorConstructor {
        readonly prototype: AsyncIterator<any>;
        new <T = unknown>(): AsyncIterator<T>;
        from<T>(iterable: _AsyncIteratorLike<T>): AsyncIterator<T>;
        range(start: number, end?: number, step?: number, inclusive?: boolean): AsyncIterator<number>;
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
type _StarMap<T, C extends boolean> = <S>(fn: (...args: T extends _IteratorLike<infer V> ? T extends _RA ? T : readonly V[] : never) => _IfElse<C, _Awaitable<S>, S>) =>
    _IfElse<C, AsyncIterator<S>, Iterator<S>>;
type _SymmetricDifference<T> = <S>(iterable: _IteratorLike<S>) => Iterator<Exclude<T, S> | Exclude<S, T>>;
type _SymmetricDifferenceAsync<T> = <S>(iterable: _AsyncIteratorLike<S>) => AsyncIterator<Exclude<T, S> | Exclude<S, T>>;

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
    interface Iterator<T> {
        enumerate(): Iterator<readonly [number, T]>;
        entries(): Iterator<readonly [number, T]>;
        roundrobin<A extends _RA<_IteratorLike>>(...iterables: A): Iterator<_IRANR<A, T>>;
        heads<A extends _RA<_IteratorLike>>(...iterables: A): Iterator<_Tuple<_IRANR<A, T>, _Length<readonly [T, ...A]>>>;
        flatten<Depth extends number = 1>(times?: Depth, options?: { keepStringsAsIs?: boolean }): Iterator<FlattenIterator<T, Depth>>;
        filterMap<S, E = undefined>(fn: (item: T, index: number) => S | E, excludedValue?: E): S;
        groupBy<S extends PropertyKey>(fn: (item: T, index: number) => S): Record<S, T[]>;
        groupByToMap<S>(fn: (item: T, index: number) => S): Map<S, T[]>;
        symmetricDifference: _SymmetricDifference<T>;
        difference<S>(iterable: _IteratorLike<S>): Iterator<Exclude<T, S>>;
        intersection<S>(iterable: _IteratorLike<S>): Iterator<S & T>;
        intersperse<S>(item: S): Iterator<T | S>;
        each(fn: (value: T, index: number) => void): Iterator<T>;
        /** @note <TNext> value is used only when the `next` method of `this` iterator is actually called */
        tee<N extends number = 2>(count?: N): _Tuple<Iterator<T>, N>;
        zip<A extends _RA<_IteratorLike>>(...iterables: A): Iterator<readonly [T, ..._MapIterator<A>]>;
        skip(count: number): Iterator<T>;
        contains(value: T): boolean;
        average(): number;
        max(): number;
        min(): number;
        count(): number;
        chunked<N extends number = 2>(times?: N): Iterator<_Tuple<T, N>>;
        chain<A extends _RA<_IteratorLike | null | undefined>>(...iterables: A): Iterator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>>;
        concat<A extends _RA<_IteratorLike | null | undefined>>(...iterables: A): Iterator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>>;
        cycle<N extends number>(/** @default Infinity */ times?: N): Iterator<T>;
        repeat<N extends number>(/** @default Infinity */ times?: N): Iterator<T>;
        starMap: _StarMap<T, false>;
        skipWhile(fn: (item: T, index: number) => unknown): Iterator<T>;
        takeWhile(fn: (item: T, index: number) => unknown): Iterator<T>;
        dropWhile(fn: (item: T, index: number) => unknown): Iterator<T>;
        zipLongest<A extends _RA<_IteratorLike>>(...iterables: A): Iterator<readonly [T, ..._MapIterator<A>]>;
        unique(): Iterator<T>;
        uniqueJustseen(): Iterator<T>;
        join<S extends string = ", ">(separator?: S): string;
        partition(filterer: (value: T, index: number) => unknown): _Tuple<Iterator<T>, 2>;
        partition<R extends T = T>(filterer: (value: T, index: number) => value is R): readonly [Iterator<R>, Iterator<Exclude<T, R>>];
    }

    interface AsyncIterator<T> {
        entries(): AsyncIterator<readonly [number, T]>;
        enumerate(): AsyncIterator<readonly [number, T]>;
        roundrobin<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncIterator<_IRANR<A, T>>;
        heads<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncIterator<_Tuple<_IRANR<A, T>, _Length<readonly [T, ...A]>>>;
        flatten<Depth extends number = 1>(times?: Depth, options?: { keepStringsAsIs?: boolean }): AsyncIterator<FlattenAsyncIterator<T, Depth>>; // TODO: Better typing
        filterMap<S, E = undefined>(fn: (item: T, index: number) => S | E, excludedValue?: E): S;
        groupBy<S extends PropertyKey>(fn: (item: T, index: number) => S): Promise<Record<S, T[]>>;
        groupByToMap<S>(fn: (item: T, index: number) => S): Promise<Map<S, T[]>>;
        symmetricDifference: _SymmetricDifferenceAsync<T>;
        difference<S>(iterable: _AsyncIteratorLike<S>): AsyncIterator<Exclude<T, S>>;
        intersection<S>(iterable: _AsyncIteratorLike<S>): AsyncIterator<S & T>;
        intersperse<S>(item: _Awaitable<S>): AsyncIterator<T | S>;
        each(fn: (value: T, index: number) => _Awaitable<unknown>): AsyncIterator<T>;
        tee<N extends number = 2>(count?: N): _Tuple<AsyncIterator<T>, N>;
        zip<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncIterator<readonly [T, ..._MapAsyncIterator<A>]>;
        skip(count: number): AsyncIterator<T>;
        contains(value: T): Promise<boolean>;
        average(): Promise<number>;
        max(): Promise<number>;
        min(): Promise<number>;
        count(): Promise<number>;
        chunked<N extends number = 2>(times?: N): AsyncIterator<_Tuple<T, N>>;
        chain<A extends _RA<_AsyncIteratorLike | null | undefined>>(...iterables: A): AsyncIterator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>>;
        concat<A extends _RA<_AsyncIteratorLike | null | undefined>>(...iterables: A): AsyncIterator<_IRANR<_RA<A extends _RA<infer V> ? NonNullable<V> : never>, T>>;
        cycle<N extends number>(/** @default Infinity */ times?: N): AsyncIterator<T>;
        repeat<N extends number>(/** @default Infinity */ times?: N): AsyncIterator<T>;
        starMap: _StarMap<T, true>;
        skipWhile(fn: (item: T, index: number) => _Awaitable<unknown>): AsyncIterator<T>;
        takeWhile(fn: (item: T, index: number) => _Awaitable<unknown>): AsyncIterator<T>;
        dropWhile(fn: (item: T, index: number) => _Awaitable<unknown>): AsyncIterator<T>;
        zipLongest<A extends _RA<_AsyncIteratorLike>>(...iterables: A): AsyncIterator<readonly [T, ..._MapAsyncIterator<A>]>;
        unique(): AsyncIterator<T>;
        uniqueJustseen(): AsyncIterator<T>;
        join<S extends string = ", ">(separator?: S): Promise<string>;
        partition(filterer: (value: T, index: number) => _Awaitable<unknown>): _Tuple<AsyncIterator<T>, 2>;
        partition<R extends T = T>(filterer: (value: T, index: number) => value is R): readonly [AsyncIterator<R>, AsyncIterator<Exclude<T, R>>];
    }
}

// polyfilled ones are easier to manage since i don't need to type another one proposed additional method here
declare type keys = "asIndexedPairs" | "drop" | "every" | "filter" | "filter" | "find" | "flatMap" | "forEach" | "map" | "reduce" | "reduce" | "reduce" | "some" | "take" | "toArray";
declare class Config {
    public additionals: boolean & Record<Exclude<keyof Iterator<any>, keys | typeof Symbol.iterator | "next" | "throw" | "return">, boolean>;
    public polyfilled: boolean & Record<keys, boolean>;
}
export const config: Config;

export const AsyncIterator: AsyncIteratorConstructor;

export const Iterator: IteratorConstructor;

/**
 * Injects `Iterator` and `AsyncIterator` constructors onto globalThis.
 */
export function installIntoGlobal(): void;
