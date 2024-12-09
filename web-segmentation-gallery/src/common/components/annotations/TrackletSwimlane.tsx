import useSelectedFrameHelper from '@/common/components/video/filmstrip/useSelectedFrameHelper';
import { BaseTracklet, DatalessMask } from '@/common/tracker/Tracker';
import { useMemo } from 'react';

type SwimlineSegment = {
  left: number;
  width: number;
};

type Props = {
  tracklet: BaseTracklet;
  onSelectFrame: (tracklet: BaseTracklet, index: number) => void;
};

function getSwimlaneSegments(masks: DatalessMask[]): SwimlineSegment[] {
  if (masks.length === 0) {
    return [];
  }

  const swimlineSegments: SwimlineSegment[] = [];
  let left = -1;

  for (let frameIndex = 0; frameIndex < masks.length; ++frameIndex) {
    const isEmpty = masks?.[frameIndex]?.isEmpty ?? true;
    if (left === -1 && !isEmpty) {
      left = frameIndex;
    } else if (left !== -1 && (isEmpty || frameIndex == masks.length - 1)) {
      swimlineSegments.push({
        left,
        width: frameIndex - left + 1,
      });
      left = -1;
    }
  }

  return swimlineSegments;
}

export default function TrackletSwimlane({ tracklet, onSelectFrame }: Props) {
  const selection = useSelectedFrameHelper();

  const segments = useMemo(() => {
    return getSwimlaneSegments(tracklet.masks);
  }, [tracklet.masks]);

  const framesWithPoints = tracklet.points.reduce<number[]>(
    (frames, pts, frameIndex) => {
      if (pts != null && pts.length > 0) {
        frames.push(frameIndex);
      }
      return frames;
    },
    [],
  );

  if (selection === null) {
    return;
  }

  return (
    <div className="flex w-full items-center gap-4">
      <div className="w-12 text-center text-xs text-white">
        Object {tracklet.id + 1}
      </div>
      <div className="relative my-0 flex h-3 flex-grow md:my-1">
        <div
          className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 opacity-40"
          style={{
            backgroundColor: tracklet.color,
          }}
        />
        {segments.map(segment => {
          return (
            <div
              key={segment.left}
              className="absolute top-1/2 h-px -translate-y-1/2"
              style={{
                backgroundColor: tracklet.color,
                left: selection.toPosition(segment.left),
                width: selection.toPosition(segment.width),
              }}
            />
          );
        })}
        {framesWithPoints.map(index => {
          return (
            <div
              key={`frame${index}`}
              onClick={() => {
                onSelectFrame?.(tracklet, index);
              }}
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 cursor-pointer rounded-full md:h-3 md:w-3"
              style={{
                left: Math.floor(selection.toPosition(index) - 4),
                backgroundColor: tracklet.color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
