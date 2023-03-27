export interface IRenderer {
  render(
    y: Uint8Array | Uint8ClampedArray,
    cb: Uint8Array | Uint8ClampedArray,
    cr: Uint8Array | Uint8ClampedArray,
    width: number,
    height: number
  ): void;
  mount(el: HTMLDivElement): void;
}
