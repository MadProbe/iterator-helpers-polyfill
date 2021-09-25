/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

declare module "tslib" {
    type ResultType<F extends Function> = F extends (...args: any[]) => infer R ? R : never;
    type LogicalNot<T extends boolean> = true extends T ? false : true;
    type LogicalAnd<T extends boolean, S extends boolean> = T extends true ? S extends true ? true : false : false;
    type LogicalOr<T extends boolean, S extends boolean> = T extends true ? true : S extends true ? true : false;
    type LogicalOr3<T extends boolean, S extends boolean, Z extends boolean> = LogicalOr<LogicalOr<T, S>, Z>;
    type Equality<T, S> = LogicalAnd<T extends S ? true : false, S extends T ? true : false>;
    type NegativeEquality<T, S> = LogicalNot<Equality<T, S>>;
    type LooseEquality<T, S> = T extends S ? true : false;
    type NegativeLooseEquality<T, S> = LogicalNot<Equality<T, S>>;
    type UndefinedLike = undefined | void;
    type IsEmptyArray<A extends any[]> = [] extends A ? Exclude<keyof A, keyof []> extends never ? true : false : false;
    type This<T extends (...args: any[]) => void> = unknown extends ThisParameterType<T> ? any : ThisParameterType<T>;
    type LastRest<A extends any[]> = IsEmptyArray<A> extends true ? A : A extends [any?, ...(infer Rest)] ? LastRest<Rest> : A;
    type RemoveArgs<A extends any[], R extends any[]> = A extends [...OptionalArgs<R>, ...(infer Rest)] ? Rest : [];
    type OptionalArgs<A extends any[]> = any[] extends A ? A | undefined[] : A extends [] ? [] :
        A extends [infer R, ...(infer Rest)] ? [R?, ...OptionalArgs<Rest>] : A;
    export type BindFunctionType = (
        <T extends (this: any, ...args: any[]) => void, A extends any[], S extends ThisParameterType<T>, V extends unknown extends S ? any | void : Equality<S, UndefinedLike> extends true ? UndefinedLike : S | UndefinedLike>(
            fn: T,
            thisArg: V,
            ...args: A extends OptionalArgs<Parameters<T>> ? A : Equality<A, []> extends true ? [] : never[]
        ) =>
            A extends [] ? Equality<S, unknown> extends true ? T : (() => ResultType<T>) :
            LogicalOr3<Equality<unknown, S>, NegativeEquality<V, UndefinedLike>, LogicalAnd<LooseEquality<S, UndefinedLike>, LooseEquality<V, UndefinedLike>>> extends true ?
            ((...args: [...RemoveArgs<Parameters<T>, OptionalArgs<A>>, ...LastRest<Parameters<T>>]) => ReturnType<T>) :
            ((this: S, ...args: [...RemoveArgs<Parameters<T>, OptionalArgs<A>>, ...LastRest<Parameters<T>>]) => ReturnType<T>)

    );
    export type CallFunctionType = <T extends (this: any, ...args: any[]) => void>(fn: T, thisArg: This<T>, ...args: Parameters<T>) => ReturnType<T>;
    export type ApplyFunctionType = <T extends (this: any, ...args: any[]) => void>(fn: T, thisArg: This<T>, args: Parameters<T> | ArrayLike<unknown>) => ReturnType<T>;

    export function __extends(d: Function, b: Function): void;
    export function __assign(t: any, ...sources: any[]): any;
    export function __rest(t: any, propertyNames: (string | symbol)[]): any;
    export function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
    export function __param(paramIndex: number, decorator: Function): Function;
    export function __metadata(metadataKey: any, metadataValue: any): Function;
    export function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
    export function __generator(thisArg: any, body: Function): any;
    export function __exportStar(m: any, o: any): void;
    export function __values(o: any): any;
    export function __read(o: any, n?: number): any[];
    /** @deprecated since TypeScript 4.2 */
    export function __spread(...args: any[][]): any[];
    /** @deprecated since TypeScript 4.2 */
    export function __spreadArrays(...args: any[][]): any[];
    export function __spreadArray(to: any[], from: any[], pack?: boolean): any[];
    export function __await(v: any): any;
    export function __asyncGenerator(thisArg: any, _arguments: any, generator: Function): any;
    export function __asyncDelegator(o: any): any;
    export function __asyncValues(o: any): any;
    export function __makeTemplateObject(cooked: string[], raw: string[]): TemplateStringsArray;
    export function __importStar<T>(mod: T): T;
    export function __importDefault<T>(mod: T): T | { default: T; };
    /**
     * Reading from a private instance field
     */
    export function __classPrivateFieldGet<T extends object, V>(
        receiver: T,
        state: { has(o: T): boolean, get(o: T): V | undefined; },
        kind?: "f"
    ): V;
    /**
     * Reading from a private static field
     */
    export function __classPrivateFieldGet<T extends new (...args: any[]) => unknown, V>(
        receiver: T,
        state: T,
        kind: "f",
        f: { value: V; }
    ): V;
    /**
     * Reading from a private instance get accessor
     */
    export function __classPrivateFieldGet<T extends object, V>(
        receiver: T,
        state: { has(o: T): boolean; },
        kind: "a",
        f: () => V
    ): V;
    /**
     * Reading from a private static get accessor
     */
    export function __classPrivateFieldGet<T extends new (...args: any[]) => unknown, V>(
        receiver: T,
        state: T,
        kind: "a",
        f: () => V
    ): V;
    /**
     * Reading from a private instance method
     */
    export function __classPrivateFieldGet<T extends object, V extends (...args: any[]) => unknown>(
        receiver: T,
        state: { has(o: T): boolean; },
        kind: "m",
        f: V
    ): V;
    /**
     * Reading from a private static method
     */
    export function __classPrivateFieldGet<T extends new (...args: any[]) => unknown, V extends (...args: any[]) => unknown>(
        receiver: T,
        state: T,
        kind: "m",
        f: V
    ): V;
    /**
     * Writing to a private instance field
     */
    export function __classPrivateFieldSet<T extends object, V>(
        receiver: T,
        state: { has(o: T): boolean, set(o: T, value: V): unknown; },
        value: V,
        kind?: "f"
    ): V;
    /**
     * Writing to a private static field
     */
    export function __classPrivateFieldSet<T extends new (...args: any[]) => unknown, V>(
        receiver: T,
        state: T,
        value: V,
        kind: "f",
        f: { value: V; }
    ): V;
    /**
     * Writing to a private instance set accessor
     */
    export function __classPrivateFieldSet<T extends object, V>(
        receiver: T,
        state: { has(o: T): boolean; },
        value: V,
        kind: "a",
        f: (v: V) => void
    ): V;
    /**
     * Writing to a private static set accessor
     */
    export function __classPrivateFieldSet<T extends new (...args: any[]) => unknown, V>(
        receiver: T,
        state: T,
        value: V,
        kind: "a",
        f: (v: V) => void
    ): V;
    export function __createBinding(object: object, target: object, key: PropertyKey, objectKey?: PropertyKey): void;

    type globalThis = typeof globalThis;
    export const $globalThis: globalThis;
    export type AnyFunction = (...args: any[]) => unknown;
    export const asyncIterator: SymbolConstructor["asyncIterator"];
    export const iterator: SymbolConstructor["iterator"];
    export const AsyncIteratorPrototype: AsyncIterator<unknown>;
    export const IteratorPrototype: Iterator<unknown>;
    export const call: CallFunctionType;
    export const apply: ApplyFunctionType;
    export const bind: BindFunctionType;
    export const hasOwnProperty: (object: object, property: PropertyKey) => boolean;
    export const { get, set }: typeof Reflect;
    export const {
        getPrototypeOf, setPrototypeOf, defineProperty, defineProperties, create, getOwnPropertyDescriptor,
        getOwnPropertyNames, preventExtensions, keys, is, isExtensible, freeze
    }: ObjectConstructor;
    export const { floor }: Math;
    export const unshift: <T>(array: T[], element: T) => number;
    export const shift: <T>(array: T[]) => T;
    export const contains: <T>(array: T[], value: T) => boolean;
    export const { Array, Object, Proxy, String, TypeError, WeakMap, Symbol, undefined }: globalThis;
    export const SameValueZero: (value1: unknown, value2: unknown) => boolean;
}