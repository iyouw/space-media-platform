import { IDecodeContext } from "../decode-context/i-decode-context";

export interface IFormatContext {
  connect(decodeContext: IDecodeContext): void;
}
