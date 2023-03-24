import { AudioFrame } from 'src/decoder/frame/audio-frame';
import { VideoFrame } from 'src/decoder/frame/video-frame';
import { MediaType } from 'src/demuxer/media-type';
import { NodeFactory } from 'src/node/factory/node-factory';
import { INode } from 'src/node/i-node';
import { INodeFactory } from 'src/node/i-node-factory';
import { Handler } from 'src/utils/typings';

export class TranscodeContext {
  private _url: string;

  private _nodeFactory: INodeFactory;

  private _mediaSourceNode?: INode;

  private _mediaDemuxNode?: INode;

  private _videoDecodeNode?: INode;

  private _audioDecodeNode?: INode;

  private _videoActionNode?: INode;

  private _audioActionNode?: INode;

  public onVideoFrameParsed?: Handler<VideoFrame>;

  public onAudioFrameParsed?: Handler<AudioFrame>;

  public constructor(url: string, nodeFactory = NodeFactory.Default) {
    this._url = url;
    this._nodeFactory = nodeFactory;
    this._mediaSourceNode = this.createMediaSourceNode();
    this._mediaDemuxNode = this.createMediaDemuxNode();
    this._videoDecodeNode = this.createVideoDecodeNode();
    this._audioDecodeNode = this.createAudioDecodeNode();
    this._videoActionNode = this.createVideoActionNode();
    this._audioActionNode = this.createAudioActonNode();

    this._mediaSourceNode.connect(this._mediaDemuxNode);
    this._mediaDemuxNode.connect(this._videoDecodeNode, MediaType.VIDEO);
    this._mediaDemuxNode.connect(this._audioDecodeNode, MediaType.AUDIO);
    this._videoActionNode.connect(this._videoActionNode);
    this._audioActionNode.connect(this._audioActionNode);
  }

  public dispose(): void {
    this._mediaSourceNode?.dispose();
    this._mediaDemuxNode?.dispose();
    this._videoDecodeNode?.dispose();
    this._audioDecodeNode?.dispose();
    this._videoActionNode?.dispose();
    this._audioActionNode?.dispose();

    this._mediaSourceNode = undefined;
    this._mediaDemuxNode = undefined;
    this._videoDecodeNode = undefined;
    this._audioDecodeNode = undefined;
    this._videoActionNode = undefined;
    this._audioActionNode = undefined;
  }

  protected createMediaSourceNode(): INode {
    return this._nodeFactory.createMediaSourceNode(this._url);
  }

  protected createMediaDemuxNode(): INode {
    return this._nodeFactory.createDemuxNode();
  }

  protected createVideoDecodeNode(): INode {
    return this._nodeFactory.createDecodeNode();
  }

  protected createAudioDecodeNode(): INode {
    return this._nodeFactory.createDecodeNode();
  }

  protected createVideoActionNode(): INode {
    const action = (data: VideoFrame) => {
      this.onVideoFrameParsed?.(data);
    };
    return this._nodeFactory.createAction<VideoFrame>(action);
  }

  protected createAudioActonNode(): INode {
    const action = (data: AudioFrame) => {
      this.onAudioFrameParsed?.(data);
    };
    return this._nodeFactory.createAction<AudioFrame>(action);
  }
}
