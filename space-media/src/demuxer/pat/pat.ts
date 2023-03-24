import { Counter } from 'src/utils/counter/counter';
import { Program } from '../program/program';

export class PAT extends Counter {
  private _programMap: Map<number, Program>;

  public constructor(length: number) {
    super(length);
    this._programMap = new Map<number, Program>();
  }

  public get length(): number {
    return this.max;
  }

  public has(programId: number): boolean {
    return this._programMap.has(programId);
  }

  public addProgram(program: Program, size: number): void {
    this._programMap.set(program.id, program);
    this.count(size);
  }
}
