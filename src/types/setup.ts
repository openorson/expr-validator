export interface ValidatorSetupOptions {
  onValid?: () => void;
  onInvalid?: () => void;
  prompt?: () => void;
}
