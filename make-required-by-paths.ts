import { UnionToIntersection } from "./union-to-intersection";

type DecrementDepth<CurrentDepth extends number> = CurrentDepth extends 5
  ? // 5 부터 차례대로 줄여나감
    4
  : CurrentDepth extends 4
    ? 3
    : CurrentDepth extends 3
      ? 2
      : CurrentDepth extends 2
        ? 1
        : never;

type DeepKeys<T, CurrentDepth extends number = 5> = [CurrentDepth] extends [
  never,
]
  ? never
  : {
      [K in keyof T & string]: NonNullable<T[K]> extends Record<string, unknown>
        ?
            | K
            | `${K}.${DeepKeys<NonNullable<T[K]>, DecrementDepth<CurrentDepth>>}`
        : K;
    }[keyof T & string];

// SetRequiredAtPath<{ a?: { b?: { c?: number } }, d?: boolean }, 'a.b'> -> { a: { b: { c?: number } }, d?: boolean }
type SetRequiredAtPath<
  T,
  P extends string,
> = P extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? Omit<T, Head> & {
        [K in Head]-?: SetRequiredAtPath<NonNullable<T[Head]>, Rest>;
      }
    : T
  : P extends keyof T
    ? Omit<T, P> & Required<Pick<T, P>>
    : T;

/**
 * MakeRequiredByPaths<{
 *      a?: {
 *          b?: {
 *              c?: number
 *          }
 *      },
 *      d?: boolean,
 *      e?: boolean
 * }, 'a.b' | 'd'>
 *
 * to-be
 *
 * {
 *      a: { // a.b 로 인해 required 로 바뀜
 *          b: { // a.b 로 인해 required 로 바뀜
 *              c?: number
 *          }
 *      },
 *      d: boolean, // 'd' 로 인해 required 로 바뀜
 *      e?: boolean
 * }
 *
 * ---
 *
 * DeepKeys<T> 는 순환참조 발생시 고장날 수 있으므로 string 을 union 으로 받아서 사용한다.
 */
export type MakeRequiredByPaths<
  T,
  KEYS extends DeepKeys<T> | string,
> = UnionToIntersection<KEYS extends any ? SetRequiredAtPath<T, KEYS> : never>;
