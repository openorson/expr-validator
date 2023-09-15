import { ValidatorDataType } from "./datatype";

export interface ValidatorSchema<Args extends {} = {}> {
  type: keyof ValidatorDataType;
  each?: boolean;
  optional?: boolean;
  args: Args;
}
