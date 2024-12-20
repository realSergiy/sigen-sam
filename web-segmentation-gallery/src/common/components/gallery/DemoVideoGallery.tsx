import { DemoVideoGalleryQuery } from '@/common/components/gallery/__generated__/DemoVideoGalleryQuery.graphql';
import VideoGalleryUploadVideo from '@/common/components/gallery/VideoGalleryUploadPhoto';
import VideoPhoto from '@/common/components/gallery/VideoPhoto';
import useScreenSize from '@/common/screen/useScreenSize';
import { type VideoData, navigationVideoAtom } from '@/demo/atoms';
import { DEMO_SHORT_NAME } from '@/demo/DemoConfig';
import { useMemo } from 'react';
import PhotoAlbum, { Photo, RenderPhotoProps } from 'react-photo-album';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';

type Props = {
  showUploadInGallery?: boolean;
  onSelect?: (video: VideoPhotoData) => void;
  onUpload: (video: VideoData) => void;
  onUploadStart?: () => void;
  onUploadError?: (error: Error) => void;
};

type VideoPhotoData = Photo &
  VideoData & {
    poster: string;
    isUploadOption: boolean;
  };

export default function DemoVideoGallery({
  showUploadInGallery = false,
  onSelect,
  onUpload,
  onUploadStart,
  onUploadError,
}: Props) {
  const router = useRouter();
  const setNavigationVideo = useSetAtom(navigationVideoAtom);
  const { isMobile: isMobileScreenSize } = useScreenSize();

  const data = useLazyLoadQuery<DemoVideoGalleryQuery>(
    graphql`
      query DemoVideoGalleryQuery {
        videos {
          edges {
            node {
              id
              path
              posterPath
              url
              posterUrl
              height
              width
              posterUrl
            }
          }
        }
      }
    `,
    {},
  );

  const allVideos: VideoPhotoData[] = useMemo(() => {
    return data.videos.edges.map(video => {
      return {
        src: video.node.url,
        path: video.node.path,
        poster: video.node.posterPath,
        posterPath: video.node.posterPath,
        url: video.node.url,
        posterUrl: video.node.posterUrl,
        width: video.node.width,
        height: video.node.height,
        isUploadOption: false,
      } as VideoPhotoData;
    });
  }, [data.videos.edges]);

  const shareableVideos: VideoPhotoData[] = useMemo(() => {
    const filteredVideos = [...allVideos];

    if (showUploadInGallery) {
      const uploadOption = {
        src: '',
        width: 1280,
        height: 720,
        poster: '',
        isUploadOption: true,
      } as VideoPhotoData;
      filteredVideos.unshift(uploadOption);
    }

    return filteredVideos;
  }, [allVideos, showUploadInGallery]);

  const renderPhoto = ({
    photo: video,
    imageProps,
  }: RenderPhotoProps<VideoPhotoData>) => {
    const { style } = imageProps;
    const { url, posterUrl } = video;

    return video.isUploadOption ? (
      <VideoGalleryUploadVideo
        style={style}
        onUpload={handleUploadVideo}
        onUploadError={onUploadError}
        onUploadStart={onUploadStart}
      />
    ) : (
      <VideoPhoto
        src={url}
        poster={posterUrl}
        style={style}
        onClick={() => {
          setNavigationVideo(video);
          router.push(location.pathname);
          onSelect?.(video);
        }}
      />
    );
  };

  function handleUploadVideo(video: VideoData) {
    setNavigationVideo(video);
    router.push(location.pathname);
    onUpload?.(video);
  }

  const descriptionStyle = 'text-sm md:text-base text-gray-400 leading-snug';

  return (
    <div className="mx-4 flex h-full flex-col pt-32 leading-tight">
      <div className="w-full flex-1 overflow-y-auto">
        <div className="pt-0 md:px-16 md:pb-8 md:pt-8">
          <div className="mb-32 text-2xl font-medium md:mx-16 md:mb-32 md:mt-0 md:text-xl">
            <h3 className="mb-2">
              Select a video to try{' '}
              <span className="hidden md:inline">
                with the {DEMO_SHORT_NAME}
              </span>
            </h3>
            <p className={descriptionStyle}>
              You’ll be able to download what you make.
            </p>
          </div>

          <PhotoAlbum<VideoPhotoData>
            layout="rows"
            photos={shareableVideos}
            targetRowHeight={isMobileScreenSize ? 120 : 200}
            rowConstraints={{
              singleRowMaxHeight: isMobileScreenSize ? 120 : 240,
              maxPhotos: 3,
            }}
            renderPhoto={renderPhoto}
            spacing={4}
          />
        </div>
      </div>
    </div>
  );
}
