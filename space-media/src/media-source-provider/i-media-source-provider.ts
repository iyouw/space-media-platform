export interface IMediaSourceProvider {
  open(): void;
  close(): void;
}
