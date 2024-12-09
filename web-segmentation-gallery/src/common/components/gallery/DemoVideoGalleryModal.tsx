import DefaultVideoGalleryModalTrigger from '@/common/components/gallery/DefaultVideoGalleryModalTrigger';
import {
  frameIndexAtom,
  sessionAtom,
  uploadingStateAtom,
  VideoData,
} from '@/demo/atoms';
import { Close } from '@carbon/icons-react';
import { useSetAtom } from 'jotai';
import { ComponentType, useCallback, useRef } from 'react';
import { Modal } from 'react-daisyui';
import DemoVideoGallery from './DemoVideoGallery';

export type VideoGalleryTriggerProps = {
  onClick: () => void;
};

type Props = {
  trigger?: ComponentType<VideoGalleryTriggerProps>;
  showUploadInGallery?: boolean;
  onOpen?: () => void;
  onSelect?: (video: VideoData, isUpload?: boolean) => void;
  onUploadVideoError?: (error: Error) => void;
};

export default function DemoVideoGalleryModal({
  trigger: VideoGalleryModalTrigger = DefaultVideoGalleryModalTrigger,
  showUploadInGallery = false,
  onOpen,
  onSelect,
  onUploadVideoError,
}: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const setFrameIndex = useSetAtom(frameIndexAtom);
  const setUploadingState = useSetAtom(uploadingStateAtom);
  const setSession = useSetAtom(sessionAtom);

  function openModal() {
    const modal = modalRef.current;
    if (modal != null) {
      modal.style.display = 'grid';
      modal.showModal();
    }
  }

  function closeModal() {
    const modal = modalRef.current;
    if (modal != null) {
      modal.close();
      modal.style.display = 'none';
    }
  }

  const handleSelect = useCallback(
    async (video: VideoData, isUpload?: boolean) => {
      closeModal();
      setFrameIndex(0);
      onSelect?.(video, isUpload);
      setUploadingState('default');
      setSession(null);
    },
    [setFrameIndex, onSelect, setUploadingState, setSession],
  );

  function handleUploadVideoStart() {
    setUploadingState('uploading');
    closeModal();
  }

  function handleOpenVideoGalleryModal() {
    onOpen?.();
    openModal();
  }

  return (
    <>
      <VideoGalleryModalTrigger onClick={handleOpenVideoGalleryModal} />
      <Modal
        ref={modalRef}
        className="relative min-h-[85vh] min-w-[85vw] overflow-hidden rounded-lg border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white shadow-[0_0_100px_50px_#000]"
      >
        <div
          onClick={closeModal}
          className="absolute right-0 top-0 z-10 cursor-pointer p-3 hover:opacity-70"
        >
          <Close size={28} />
        </div>
        <Modal.Body>
          <div className="absolute bottom-0 left-0 right-0 top-4 overflow-y-auto">
            <DemoVideoGallery
              showUploadInGallery={showUploadInGallery}
              onSelect={video => handleSelect(video)}
              onUpload={video => handleSelect(video, true)}
              onUploadStart={handleUploadVideoStart}
              onUploadError={onUploadVideoError}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
