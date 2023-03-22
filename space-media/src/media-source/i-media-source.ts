import { IFormatContext } from "../format-context/i-format-context";

export interface IMediaSource {
  open(): void;
  close(): void;
  connect(formatContext: IFormatContext): void;
}
