import { OutOfRangeException } from '../exception/out-of-range-exception';
import { ByteArrayLike, Handler } from '../typings';
import { IStream } from './i-stream';

export class MemoryStream implements IStream {
  public static readonly Page = 64 * 1024;

  private _buffer: Uint8Array;
  private _position: number;
  private _length: number;

  private _maxCapacity: number;
  private _recycledLength: number;

  public onDataArrived?: Handler<MemoryStream>;

  public constructor(capacity = MemoryStream.Page * 10, maxCapacity = MemoryStream.Page * 30) {
    this._buffer = new Uint8Array(capacity);
    this._position = 0;
    this._length = 0;
    this._maxCapacity = maxCapacity;
    this._recycledLength = 0;
  }

  public get capacity(): number {
    return this._buffer.length;
  }

  public get position(): number {
    return this._position;
  }

  public get length(): number {
    return this._length;
  }

  public get free(): number {
    return this.capacity - this._length;
  }

  public get recycledLength(): number {
    return this._recycledLength;
  }

  public get(index: number): number {
    this.checkPosition(index);
    return this._buffer[index];
  }

  public has(count: number): boolean {
    return this._position + count <= this._length;
  }

  public write(data: ByteArrayLike | Array<ByteArrayLike>): void {
    const buffers = Array.isArray(data) ? data : [data];
    const length = buffers.reduce((ret, buffer) => (ret += buffer.byteLength), 0);
    this.ensureFree(length);
    buffers.forEach((buffer) => {
      const buf = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
      this._buffer.set(buf, this._length);
      this._length += buf.length;
    });
    this.onDataArrived?.(this);
  }

  public read(count?: number): Uint8Array {
    const pos = count ? this._position + count : this._length;
    this.checkPosition(pos);
    const res = this._buffer.subarray(this._position, pos);
    this._position = pos;
    return res;
  }

  public skip(count: number): void {
    const pos = this._position + count;
    this.checkPosition(pos);
    this._position = pos;
  }

  public rewind(count: number): void {
    const pos = this._position - count;
    this.checkPosition(pos);
    this._position = pos;
  }

  public seek(position: number): void {
    this.checkPosition(position);
    this._position = position;
  }

  public dispose(): void {
    this._buffer = new Uint8Array();
  }

  private checkPosition(position: number): void {
    if (position < 0 || position > this._length) throw new OutOfRangeException(0, this._length, position);
  }

  private ensureFree(length: number): void {
    if (this.free >= length) return;
    if (this.free + this._position >= length && this.capacity >= this._maxCapacity) {
      this.recycle();
      return;
    }
    this.expandeFor(length);
  }

  private recycle(): void {
    this._buffer.copyWithin(0, this._position, this._length);
    this._recycledLength += this._position;
    this._length -= this._position;
    this._position = 0;
  }

  private expandeFor(length: number): void {
    const size = this.capacity + Math.ceil(length / MemoryStream.Page) * MemoryStream.Page;
    const buf = new Uint8Array(size);
    buf.set(this._buffer);
    this._buffer = buf;
  }
}
