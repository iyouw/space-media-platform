export class BlockHelper {
  public static StartBlock(start?: number): Array<number> {
    const res = [0x00, 0x00, 0x01];
    if (start) res.push(start);
    return res;
  }
}
