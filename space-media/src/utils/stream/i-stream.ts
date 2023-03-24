import { ByteArrayLike } from '../typings';

export interface IStream {
  readonly position: number;
  readonly length: number;
  get(index: number): number;
  write(data: ByteArrayLike | Array<ByteArrayLike>): void;
  read(count?: number): Uint8Array;
  skip(count: number): void;
  rewind(count: number): void;
  seek(position: number): void;
  dispose(): void;
}
