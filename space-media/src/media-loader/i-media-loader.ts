import { Handler } from 'src/utils/typings';

export interface IMediaLoader {
  readonly url: string;
  onDataArrived?: Handler<ArrayBuffer>;
  start(): void;
  stop(): void;
}
