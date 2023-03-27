import { Countable } from '../counter/countable';

export class CountableMap<TKey, TValue> extends Countable {
  private _map: Map<TKey, TValue>;

  public constructor(max: number) {
    super(max);
    this._map = new Map<TKey, TValue>();
  }

  public has(key: TKey): boolean {
    return this._map.has(key);
  }

  public add(key: TKey, value: TValue, count?: number): void {
    this._map.set(key, value);
    if (count) this.count(count);
  }

  public remove(key: TKey, count?: number): void {
    this._map.delete(key);
    if (count) this.count(-count);
  }

  public keys(): Array<TKey> {
    return Array.from(this._map.keys());
  }

  public values(): Array<TValue> {
    return Array.from(this._map.values());
  }
}
