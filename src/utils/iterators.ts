import { undefined, $globalThis, TypeError } from "tslib";

export const Iterator = function Iterator() {
    if (new.target === undefined || new.target as never === $globalThis) {
        throw TypeError("Iterator constructor cannot be called without `new`");
    }
} as unknown as IteratorConstructor;

export const AsyncIterator = function AsyncIterator() {
    if (new.target === undefined || new.target as never === $globalThis) {
        throw TypeError("AsyncIterator constructor cannot be called without `new`");
    }
} as unknown as AsyncIteratorConstructor;
