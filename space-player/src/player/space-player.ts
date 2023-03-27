import { AudioFrame, TranscodeContext, VideoFrame } from 'space-media';
import { GLRenderer } from 'src/renderer/gl-renderer/gl-renderer';
import { IRenderer } from 'src/renderer/i-renderer';
import { WebAudioSounder } from 'src/sounder';
import { ISounder } from 'src/sounder/i-sounder';
import { IPlayer } from './i-player';

export class SpacePlayer implements IPlayer {
  private _context?: TranscodeContext;

  private _sounder: ISounder;
  private _renderer: IRenderer;

  private _videoFrames: Array<VideoFrame>;
  private _audioFrams: Array<AudioFrame>;

  private _paused: boolean;

  private _animationId: number;

  public constructor() {
    this._sounder = new WebAudioSounder();
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
    const video = this._videoFrames.shift();
    if (!video) return;
    const videoData = video.data;
    this._renderer.render(
      videoData[0] as Uint8ClampedArray,
      videoData[1] as Uint8ClampedArray,
      videoData[2] as Uint8ClampedArray,
      video.width,
      video.height
    );

    const audio = this._audioFrams.shift();
    if (!audio) return;
    const audioData = audio.data;
    this._sounder.sound(audioData[0], audioData[1], audio.sampleRate);
  }
}
