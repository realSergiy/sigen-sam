'use client';

import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import VideoWorkerBridge from './VideoWorkerBridge';

type Options = {
  createVideoWorker?: () => Worker;
  createWorkerBridge?: CreateWorkerBridgeFunction;
};

const DEFAULT_OPTIONS: Options = {
  createVideoWorker: () =>
    new Worker(new URL('./VideoWorker', import.meta.url), {
      type: 'module',
    }),
};

type WorkerFactory = () => Worker;

type CreateWorkerBridgeFunction = (
  workerFactory: WorkerFactory,
) => VideoWorkerBridge;

export default function useVideoWorker(
  src: string,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: Options = {},
) {
  const isControlTransferredToOffscreenRef = useRef(false);

  const mergedOptions = useMemo(() => {
    const definedProps = (o: Options) =>
      Object.fromEntries(
        Object.entries(o).filter(([_k, v]) => v !== undefined),
      );
    return Object.assign(
      DEFAULT_OPTIONS,
      definedProps(options),
    ) as Required<Options>;
  }, [options]);

  const [worker, setWorker] = useState<VideoWorkerBridge>();

  useEffect(() => {
    // Thi will on in the browser.
    const bridge = mergedOptions.createWorkerBridge
      ? mergedOptions.createWorkerBridge(mergedOptions.createVideoWorker)
      : VideoWorkerBridge.create(mergedOptions.createVideoWorker);
    setWorker(bridge);
  }, [mergedOptions]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas == null) {
      return;
    }

    if (worker == null) {
      return;
    }

    if (isControlTransferredToOffscreenRef.current) {
      return;
    }

    isControlTransferredToOffscreenRef.current = true;

    worker.setCanvas(canvas);

    return () => {
      // Cannot terminate worker in DEV mode
      // workerRef.current?.terminate();
    };
  }, [canvasRef, mergedOptions, worker]);

  useEffect(() => {
    worker?.setSource(src);
  }, [src, worker]);

  return worker;
}
