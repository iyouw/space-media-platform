import { CountableMap } from 'src/utils/map/countable-map';
import { Program } from '../program/program';

export class PAT extends CountableMap<number, Program> {
  public get length(): number {
    return this.max;
  }
}
