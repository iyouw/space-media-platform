import { AudioFrame, TranscodeContext, VideoFrame } from 'space-media';
import { GLRenderer } from 'src/renderer/gl-renderer/gl-renderer';
import { IRenderer } from 'src/renderer/i-renderer';
import { IPlayer } from './i-player';

export class SpacePlayer implements IPlayer {
  private _context?: TranscodeContext;

  private _renderer: IRenderer;

  private _videoFrames: Array<VideoFrame>;
  private _audioFrams: Array<AudioFrame>;

  private _paused: boolean;

  private _animationId: number;

  public constructor() {
    this._renderer = new GLRenderer();
    this._videoFrames = new Array<VideoFrame>();
    this._audioFrams = new Array<AudioFrame>();

    this._paused = false;
    this._animationId = 0;
  }

  public mount(el: HTMLDivElement): void {
    this._renderer.mount(el);
  }

  public open(url: string): void {
    this._context = new TranscodeContext(url);
    this._context.onAudioFrameParsed = this.onAudioFrameParsed.bind(this);
    this._context.onVideoFrameParsed = this.onVideoFrameParsed.bind(this);
    this.play();
  }

  public close(): void {
    this._context?.dispose();
    this._context = undefined;
    this._videoFrames = new Array<VideoFrame>();
    this._audioFrams = new Array<AudioFrame>();
  }

  public play(): void {
    if (this._animationId) return;
    this._animationId = requestAnimationFrame(this.update.bind(this));
    this._paused = false;
  }

  public pause(): void {}

  private onAudioFrameParsed(frame: AudioFrame): void {
    this._audioFrams.push(frame);
  }

  private onVideoFrameParsed(frame: VideoFrame): void {
    this._videoFrames.push(frame);
  }

  private update(): void {
    this._animationId = requestAnimationFrame(this.update.bind(this));
    this.updateForStreaming();
  }

  private updateForStreaming(): void {
    const frame = this._videoFrames.shift();
    if (!frame) return;
    const buffers = frame.data;
    this._renderer.render(
      buffers[0] as Uint8ClampedArray,
      buffers[1] as Uint8ClampedArray,
      buffers[2] as Uint8ClampedArray,
      frame.width,
      frame.height
    );
  }
}
