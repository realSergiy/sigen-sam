'use client';

import { VideoData } from '@/demo/atoms';
import { useSetAtom } from 'jotai';
import { PropsWithChildren, useEffect, useRef } from 'react';
import Video, { VideoRef, VideoRefHandle } from '../Video';
import { videoAtom } from './atoms';

export type ControlsProps = {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPreviousFrame?: () => void;
  onNextFrame?: () => void;
};

type Props = PropsWithChildren<{
  video: VideoData;
  layers?: React.ReactNode;
  loading?: boolean;
}>;

export default function VideoEditor({
  video: inputVideo,
  layers,
  loading,
  children,
}: Props) {
  const videoRef = useRef<VideoRefHandle>(null);
  const setVideo = useSetAtom(videoAtom);

  // Initialize video atom
  useEffect(() => {
    setVideo(videoRef.current ? videoRef.current.handle : null);
    return () => {
      setVideo(null);
    };
  }, [setVideo, videoRef.current]);

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-clip rounded-md md:overflow-visible">
      <div className="relative w-full max-w-[1280px] flex-grow overflow-hidden">
        <Video
          ref={videoRef}
          src={inputVideo.url}
          width={inputVideo.width}
          height={inputVideo.height}
          loading={loading}
        />
        <div className="absolute bottom-0 left-0 right-0 top-0">{layers}</div>
      </div>
      {children}
    </div>
  );
}
