import PlaybackButton from '@/common/components/button/PlaybackButton';
import VideoFilmstrip from '@/common/components/video/filmstrip/VideoFilmstrip';

export default function VideoFilmstripWithPlayback() {
  return (
    <div className="flex w-full items-end gap-4 px-4">
      <div className="flex h-12 w-12 items-center justify-center">
        <PlaybackButton />
      </div>
      <div className="flex-grow">
        <VideoFilmstrip />
      </div>
    </div>
  );
}
