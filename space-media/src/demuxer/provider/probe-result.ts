import { IDemuxerProvider } from './i-demuxer-provider';
import { ProbeStatus } from './probe-status';

export interface ProbeResultSucces {
  status: ProbeStatus.SUCCESS;
  provider: IDemuxerProvider;
}

export interface ProbeResultCommon {
  status: ProbeStatus.NEEDDATA | ProbeStatus.FAILURE;
}

export type ProbeResult = ProbeResultSucces | ProbeResultCommon;
