import { EnableStatsRequest } from '@/common/components/video/VideoWorkerTypes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useVideo from '../../common/components/video/editor/useVideo';
import {
  GetMemoryStatsRequest,
  GetStatsCanvasRequest,
  MemoryStatsResponse,
  SetStatsCanvasResponse,
} from './Stats';

const URL_PARAM = 'monitors';

export default function StatsView() {
  const searchParams = useSearchParams();
  const video = useVideo();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isWrapped, setIsWrapped] = useState<boolean>(false);

  const isEnabled = useMemo(() => {
    return (
      searchParams.has(URL_PARAM) &&
      ['true', ''].includes(searchParams.get(URL_PARAM) ?? '')
    );
  }, [searchParams]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const worker = video?.getWorker_ONLY_USE_WITH_CAUTION();

    // Enable stats for video worker
    worker?.postMessage({
      action: 'enableStats',
    } as EnableStatsRequest);

    function onMessage(
      event: MessageEvent<GetStatsCanvasRequest | GetMemoryStatsRequest>,
    ) {
      if (event.data.action === 'getStatsCanvas') {
        // Add stats canvas and hand control over to worker
        const canvas = document.createElement('canvas');
        canvas.width = event.data.width * window.devicePixelRatio;
        canvas.height = event.data.height * window.devicePixelRatio;
        canvas.style.width = `${event.data.width}px`;
        canvas.style.height = `${event.data.height}px`;
        containerRef.current?.appendChild(canvas);

        const offscreenCanvas = canvas.transferControlToOffscreen();
        worker?.postMessage(
          {
            action: 'setStatsCanvas',
            id: event.data.id,
            canvas: offscreenCanvas,
            devicePixelRatio: window.devicePixelRatio,
          } as SetStatsCanvasResponse,
          {
            transfer: [offscreenCanvas],
          },
        );
      } else if (event.data.action === 'getMemoryStats') {
        // @ts-expect-error performance.memory might not exist
        const memory = performance.memory ?? {
          jsHeapSizeLimit: 0,
          totalJSHeapSize: 0,
          usedJSHeapSize: 0,
        };
        worker?.postMessage({
          action: 'memoryStats',
          id: event.data.id,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          totalJSHeapSize: memory.totalJSHeapSize,
          usedJSHeapSize: memory.usedJSHeapSize,
        } as MemoryStatsResponse);
      }
    }

    worker?.addEventListener('message', onMessage);
    return () => {
      worker?.removeEventListener('message', onMessage);
    };
  }, [video, isEnabled]);

  function handleClick() {
    setIsWrapped(w => !w);
  }

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed left-0 top-0 z-[10000] flex w-full cursor-pointer flex-row overflow-x-auto opacity-90 ${
        isWrapped ? 'flex-wrap' : 'flex-nowrap'
      }`}
      onDoubleClick={handleClick}
    />
  );
}
