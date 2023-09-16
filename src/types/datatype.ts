export interface ValidatorDataType {
  string: string;
  number: number;
  boolean: boolean;
  date: Date;
}

export interface ValidatorDataType {
  null: null;
  undefined: undefined;
  none: null | undefined;
}

export interface ValidatorDataType {
  true: true;
  false: false;
  truthy: unknown;
  falsy: false | "" | 0 | 0n | null | undefined;
}

export interface ValidatorDataType {
  numberRange: [number, number];
  dateRange: [Date, Date];
}

export interface ValidatorDataType {
  empty: "";
  zero: 0;
}

export interface ValidatorDataType {
  email: string;
  phoneNumber: string;
}
