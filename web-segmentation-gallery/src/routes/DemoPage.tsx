import Toolbar from '@/common/components/toolbar/Toolbar';
import DemoVideoEditor from '@/common/components/video/editor/DemoVideoEditor';
import useInputVideo from '@/common/components/video/useInputVideo';
import StatsView from '@/debug/stats/StatsView';
import { navigationVideoAtom, VideoData } from '@/demo/atoms';
import DemoPageLayout from '@/layouts/DemoPageLayout';
import { DemoPageQuery } from '@/routes/__generated__/DemoPageQuery.graphql';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

type LocationState = {
  video?: VideoData;
};

export default function DemoPage() {
  const data = useLazyLoadQuery<DemoPageQuery>(
    graphql`
      query DemoPageQuery {
        defaultVideo {
          path
          posterPath
          url
          posterUrl
          height
          width
        }
      }
    `,
    {},
  );

  const navVideo = useAtomValue(navigationVideoAtom);
  const { setInputVideo } = useInputVideo();

  const video = useMemo(() => {
    return navVideo ?? data.defaultVideo;
  }, [navVideo, data]);

  useEffect(() => {
    setInputVideo(video);
  }, [video, setInputVideo]);

  return (
    <DemoPageLayout>
      <StatsView />
      <Toolbar />
      <DemoVideoEditor video={video} />
    </DemoPageLayout>
  );
}
