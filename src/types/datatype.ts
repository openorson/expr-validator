export interface ValidatorDataType {
  string: string;
  number: number;
  numberRange: [number, number];
  boolean: boolean;
  true: true;
  false: false;
  date: Date;
  dateRange: [Date, Date];
  empty: "";
  zero: 0;
  null: null;
  undefined: undefined;
  none: null | undefined;
  truthy: unknown;
  falsy: false | "" | 0 | 0n | null | undefined;
}
