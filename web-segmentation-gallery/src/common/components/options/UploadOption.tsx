import useUploadVideo from '@/common/components/gallery/useUploadVideo';
import OptionButton from '@/common/components/options/OptionButton';
import Logger from '@/common/logger/Logger';
import useScreenSize from '@/common/screen/useScreenSize';
import {
  sessionAtom,
  uploadingStateAtom,
  navigationVideoAtom,
} from '@/demo/atoms';
import { MAX_UPLOAD_FILE_SIZE } from '@/demo/DemoConfig';
import { Close, CloudUpload } from '@carbon/icons-react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

type Props = {
  onUpload: () => void;
};

export default function UploadOption({ onUpload }: Props) {
  const router = useRouter();
  const setNavigationVideo = useSetAtom(navigationVideoAtom);
  const { isMobile } = useScreenSize();
  const setUploadingState = useSetAtom(uploadingStateAtom);
  const setSession = useSetAtom(sessionAtom);

  const { getRootProps, getInputProps, isUploading, error } = useUploadVideo({
    onUpload: videoData => {
      setNavigationVideo(videoData);
      router.push(`${location.pathname}${location.search}`);
      onUpload();
      setUploadingState('default');
      setSession(null);
    },
    onUploadError: (error: Error) => {
      setUploadingState('error');
      Logger.error(error);
    },
    onUploadStart: () => {
      setUploadingState('uploading');
    },
  });

  return (
    <div className="cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />

      <OptionButton
        variant="gradient"
        title={
          error !== null ? (
            'Upload Error'
          ) : isMobile ? (
            <>
              Upload{' '}
              <div className="text-xs opacity-70">
                Max {MAX_UPLOAD_FILE_SIZE}
              </div>
            </>
          ) : (
            <>
              Upload your own{' '}
              <div className="text-xs opacity-70">
                Max {MAX_UPLOAD_FILE_SIZE}
              </div>
            </>
          )
        }
        Icon={error !== null ? Close : CloudUpload}
        loadingProps={{ loading: isUploading, label: 'Uploading...' }}
        onClick={() => {}}
      />
    </div>
  );
}
