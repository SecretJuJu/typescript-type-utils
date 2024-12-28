export type EnumToUnion<T> = T[keyof T];

/**
 * enum A {
 *     a = 'a',
 *     b = 'b',
 *     c = 'c',
 * }
 *
 * type B = EnumToUnion<typeof A>; // 'a' | 'b' | 'c'
 */