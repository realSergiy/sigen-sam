`use client`;

import StaticVideoPlayer from '@/common/loading/StaticVideoPlayer';
import { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  title: string;
  description?: string | ReactNode;
  linkProps?: {
    to: string;
    label: string;
  };
}>;

export default function LoadingStateScreen({
  title,
  description,
  children,
  linkProps,
}: Props) {
  return (
    <div className="min-h-full bg-black">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-8 py-24 sm:py-12">
        <div className="flex justify-center">
          <div className="h-full max-h-[450px] max-w-[450px] overflow-hidden rounded-xl border-2 border-white sm:h-[300px] sm:w-[300px]">
            <StaticVideoPlayer
              src="/videos/sam2_720px_dark.mp4"
              aspectRatio="square"
              poster="/videos/sam2_video_poster.png"
              muted
              loop
              autoPlay
              playsInline
              controls={false}
            />
          </div>
        </div>
        <h2 className="text-center text-2xl font-normal leading-8">{title}</h2>
        {description != null && (
          <div className="text-center text-gray-400">{description}</div>
        )}
        {children}
        {/*
        linkProps != null && (
          <Link
            to={linkProps.to}
            className="text-center text-gray-400 underline"
          >
            {linkProps.label}
          </Link>
        )
        */}
      </div>
    </div>
  );
}
