import { OutOfRangeException } from '../exception/out-of-range-exception';
import { ByteArrayLike } from '../typings';
import { BlockHelper } from './block-helper';

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

  public get nextIndex(): number {
    return (this._position + 7) >> 3;
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

  public has(count: number): boolean {
    return this._position + count <= this.length;
  }

  public isBlock(block: Array<number>, index?: number): boolean {
    const length = block.length;
    const idx = index ?? this.nextIndex;
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

  public isNextBytesAreBlock(block: Array<number>): boolean {
    return this.isBlock(block, this.nextIndex);
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

  public readByteAfterBlock(block: Array<number>): number {
    let res = -1;
    if (this.moveToBlock(block)) {
      res = this._data[this.index];
      this.index++;
    }
    return res;
  }

  public readToEnd(): Uint8Array {
    return this._data.subarray(this.index);
  }

  public findStartCode(code: number): number {
    let current = 0;
    while (true) {
      current = this.findNextStartCode();
      if (current === code || current === -1) break;
    }
    return current;
  }

  public findNextStartCode(): number {
    const totalBytes = this.byteLength - 3;
    for (let i = this.nextIndex; i <= totalBytes; i++) {
      if (this.isStartCode(i)) {
        this.index = i + 4;
        return this._data[i + 3];
      }
    }
    this.index = this.byteLength;
    return -1;
  }

  public isStartCode(index: number): boolean {
    return (
      index >= this.byteLength ||
      (this._data[index] === 0x00 && this._data[index + 1] === 0x00 && this._data[index + 2] === 0x01)
    );
  }

  public isNextBytesAreStartCode(): boolean {
    return this.isStartCode(this.nextIndex);
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
