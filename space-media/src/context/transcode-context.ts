import { AudioFrame } from 'src/decoder/frame/audio-frame';
import { VideoFrame } from 'src/decoder/frame/video-frame';
import { INode } from 'src/node/i-node';
import { Handler } from 'src/utils/typings';

export class TranscodeContext {
  private _url: string;

  private _mediaSourceNode?: INode;

  private _mediaDemuxNode?: INode;

  private _videoDecodeNode?: INode;

  private _audioDecodeNode?: INode;

  public onVideoFrameParsed?: Handler<VideoFrame>;

  public onAudioFrameParsed?: Handler<AudioFrame>;

  public constructor(url: string) {
    this._url = url;
  }

  public dispose(): void {
    this._mediaSourceNode?.dispose();
    this._mediaDemuxNode?.dispose();
    this._videoDecodeNode?.dispose();
    this._audioDecodeNode?.dispose();
  }
}
