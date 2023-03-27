export interface IPlayer {
  mount(el: HTMLDivElement): void;
  open(url: string): void;
  close(): void;
  play(): void;
  pause(): void;
}
