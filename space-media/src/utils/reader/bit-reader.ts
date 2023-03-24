import { OutOfRangeException } from '../exception/out-of-range-exception';
import { ByteArrayLike } from '../typings';

export class BitReader {
  private _data: Uint8Array;
  private _position: number;

  public constructor(data: ByteArrayLike | Array<ByteArrayLike>) {
    this._data = this.initData(data);
    this._position = 0;
  }

  public get position(): number {
    return this._position;
  }

  public get length(): number {
    return this.byteLength << 3;
  }

  public get isEnd(): boolean {
    return this._position >= this.length;
  }

  public get index(): number {
    return this._position >> 3;
  }

  public set index(idx: number) {
    this._position = idx << 3;
  }

  public get byteLength(): number {
    return this._data.length;
  }

  public read(count: number): number {
    const position = this._position + count;
    this.checkPosition(position);
    const res = this.peek(count);
    this._position = position;
    return res;
  }

  public rewind(count: number): void {
    const position = this._position - count;
    this.checkPosition(position);
    this._position = position;
  }

  public skip(count: number): void {
    const position = this._position + count;
    this.checkPosition(position);
    this._position = position;
  }

  public seek(position: number): void {
    this.checkPosition(position);
    this._position = position;
  }

  public readToEnd(): Uint8Array {
    return this._data.subarray(this._position);
  }

  public has(count: number): boolean {
    return this._position + count <= this.length;
  }

  public isBlock(block: Array<number>, index?: number): boolean {
    const length = block.length;
    const idx = index ?? this.index;
    if (idx + length > this.byteLength) return false;
    let res = true;
    for (let i = 0; i < length; i++) {
      if (this._data[idx + i] !== block[i]) {
        res = false;
        break;
      }
    }
    return res;
  }

  public moveToBlock(block: Array<number>): boolean {
    let res = false;
    while (this.hasBytes(block.length)) {
      if (this.isBlock(block)) {
        this.index += block.length;
        res = true;
        break;
      }
      this.index++;
    }
    return res;
  }

  private checkPosition(position: number): void {
    if (position < 0 || position > this.length) throw new OutOfRangeException(0, this.length, position);
  }

  private peek(count: number): number {
    let res = 0;
    let pos = this._position;
    while (count) {
      const num = this._data[pos >> 3];
      const remaining = 8 - (pos & 7);
      const read = remaining < count ? remaining : count;
      const shift = remaining - read;
      const mask = 0xff >> (8 - read);

      res = (res << read) | ((num & (mask << shift)) >> shift);
      count -= read;
      pos += read;
    }
    return res;
  }

  private hasBytes(length: number): boolean {
    return this.index + length <= this.byteLength;
  }

  private initData(data: ByteArrayLike | Array<ByteArrayLike>): Uint8Array {
    const buffers = Array.isArray(data) ? data : [data];
    const length = buffers.reduce((ret, buffer) => (ret += buffer.byteLength), 0);
    const res = new Uint8Array(length);
    let pos = 0;
    buffers.forEach((buffer) => {
      const buf = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
      res.set(buf, pos);
      pos += buf.length;
    });
    return res;
  }
}
