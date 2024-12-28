// UnionToIntersection<A | B | C> -> A & B & C
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

// example
type A = { a: string } | { b: number } | ({ c: boolean } & { d: string });
/**
 * const a: UnionToIntersection<A> = { // Error: d is missing
 *   a: "a",
 *   b: 1,
 *   c: true,
 * };
 */

// OK
const b: UnionToIntersection<A> = {
  a: "a",
  b: 1,
  c: true,
  d: "d",
};
