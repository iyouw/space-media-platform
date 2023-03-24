import { Exception } from './exception';

export class NotFoundException extends Exception {
  public toString(): string {
    return `Can not found ${this.message}`;
  }
}
