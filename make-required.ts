
/**
 * MakeRequired<{ a?: number, b?: string, c?: boolean }, 'b' | 'c'>
 *   => { a?: number; b: string; c: boolean }
 */
export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
    Required<Pick<T, K>>;
