'use client';

import type { VideoGalleryTriggerProps } from '@/common/components/gallery/DemoVideoGalleryModal';
import DemoVideoGalleryModal from '@/common/components/gallery/DemoVideoGalleryModal';
import useVideo from '@/common/components/video/editor/useVideo';
import Logger from '@/common/logger/Logger';
import {
  navigationVideoAtom,
  isStreamingAtom,
  uploadingStateAtom,
  VideoData,
} from '@/demo/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { ComponentType, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  videoGalleryModalTrigger?: ComponentType<VideoGalleryTriggerProps>;
  showUploadInGallery?: boolean;
  onChangeVideo?: () => void;
};

export default function ChangeVideoModal({
  videoGalleryModalTrigger: VideoGalleryModalTriggerComponent,
  showUploadInGallery = true,
  onChangeVideo,
}: Props) {
  const isStreaming = useAtomValue(isStreamingAtom);
  const setUploadingState = useSetAtom(uploadingStateAtom);
  const video = useVideo();
  const setNavigationVideo = useSetAtom(navigationVideoAtom);
  const router = useRouter();

  const handlePause = useCallback(() => {
    video?.pause();
  }, [video]);

  function handlePauseOrAbortVideo() {
    if (isStreaming) {
      video?.abortStreamMasks();
    } else {
      handlePause();
    }
  }

  function handleSwitchVideos(video: VideoData) {
    const newUrl = `${location.pathname}${location.search}`;
    setNavigationVideo(video);
    router.push(newUrl);
    onChangeVideo?.();
  }

  function handleUploadVideoError(error: Error) {
    setUploadingState('error');
    Logger.error(error);
  }

  return (
    <DemoVideoGalleryModal
      trigger={VideoGalleryModalTriggerComponent}
      showUploadInGallery={showUploadInGallery}
      onOpen={handlePauseOrAbortVideo}
      onSelect={handleSwitchVideos}
      onUploadVideoError={handleUploadVideoError}
    />
  );
}
