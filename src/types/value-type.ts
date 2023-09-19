export interface ValidatorValueType {
  string: string;

  number: number;
  numberRange: [number, number];

  boolean: boolean;

  date: Date;
  dateRange: [Date, Date];
}
