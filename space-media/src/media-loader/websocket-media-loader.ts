import { Handler } from '../utils/typings';
import { IMediaLoader } from './i-media-loader';

export class WebsocketMediaLoader implements IMediaLoader {
  private _socket?: WebSocket;
  private _shouldRetry: boolean;
  private _retryTimer: number;

  private _progress: number;

  public readonly url: string;
  public readonly retryInterval: number;
  public onDataArrived?: Handler<ArrayBuffer>;

  public constructor(url: string, retryInterval = 5) {
    this.url = url;
    this.retryInterval = retryInterval;
    this._shouldRetry = !!retryInterval;
    this._retryTimer = 0;
    this._progress = 0;
  }

  public get progress(): number {
    return this._progress;
  }

  public start(): void {
    this._progress = 0;
    this._socket = new WebSocket(this.url);
    this._socket.binaryType = 'arraybuffer';
    this._socket.onopen = this.onOpen.bind(this);
    this._socket.onmessage = this.onMessage.bind(this);
    this._socket.onclose = this.onClose.bind(this);
  }

  public stop(): void {
    this._shouldRetry = false;
    this._socket?.close();
    this._socket = undefined;
  }

  private onOpen(): void {
    this._progress = 1;
  }

  private onMessage(event: MessageEvent<ArrayBuffer>): void {
    this.onDataArrived?.(event.data);
  }

  private onClose(): void {
    if (!this._shouldRetry) return;
    clearTimeout(this._retryTimer);
    this._retryTimer = setTimeout(() => this.start(), this.retryInterval * 1000);
  }
}
