export class Program {
  private _id: number;
  private _number: number;

  public constructor(id: number, number: number) {
    this._id = id;
    this._number = number;
  }

  public get id(): number {
    return this._id;
  }

  public get number(): number {
    return this._number;
  }
}
