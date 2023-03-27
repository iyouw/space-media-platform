export interface ICountable {
  readonly max: number;
  readonly isCompleted: boolean;
  count(count: number): void;
}
