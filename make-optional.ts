
/**
 * MakeOptional<{ a: number, b: string, c: boolean }, 'b' | 'c'>
 *   => { a: number; b?: string; c?: boolean }
 */
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;