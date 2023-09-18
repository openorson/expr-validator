type Insert<T extends unknown[], U> = T extends [infer F, ...infer L] ? [F, U, ...L] | [F, ...Insert<L, U>] : [U];

type PermutationsOfTuple<T extends unknown[], R extends unknown[] = []> = T extends [infer F, ...infer L]
  ? PermutationsOfTuple<L, Insert<R, F> | [F, ...R]>
  : R;
