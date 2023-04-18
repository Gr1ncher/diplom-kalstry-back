/**
 * Nullable data type.
 */
export type Option<T> = T | null;

export type OptionMap<T> = {
  [K in keyof T]: Option<T[K]>;
};

export interface AppResponse<T> {
  success: boolean;
  data: T;
}
