import { Exception } from './exception';

export class NotImplementException extends Exception {
  public toString(): string {
    return `Not implement: ${this.message}`;
  }
}
