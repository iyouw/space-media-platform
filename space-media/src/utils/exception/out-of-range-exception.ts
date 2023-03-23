import { Exception } from './exception';

export class OutOfRangeException extends Exception {
  public readonly start: number;
  public readonly end: number;
  public readonly request: number;

  public constructor(start: number, end: number, request: number, message?: string) {
    super(message);
    this.start = start;
    this.end = end;
    this.request = request;
  }

  public toString(): string {
    return `Out of range: the ${this.request} is out of range(${this.start},${this.end})`;
  }
}
