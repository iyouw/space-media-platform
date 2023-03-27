export interface ISounder {
  sound(left: Float32Array, right: Float32Array, sampleRate: number): void;
  dispose(): void;
}
