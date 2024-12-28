export type NonEmptyArray<T = unknown[]> = [T, ...T[]];

// const a: NonEmptyArray<number> = []; // Error
// const b: NonEmptyArray<number> = [1]; // OK
