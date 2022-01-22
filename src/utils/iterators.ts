import { undefined, $globalThis, TypeError } from "tslib";


export const Iterator: IteratorConstructor = function Iterator() {
    if (new.target === undefined || new.target as never === $globalThis) {
        throw TypeError("Iterator constructor cannot be called without `new`");
    }
} as never;

export const AsyncIterator: AsyncIteratorConstructor = function AsyncIterator() {
    if (new.target === undefined || new.target as never === $globalThis) {
        throw TypeError("AsyncIterator constructor cannot be called without `new`");
    }
} as never;
