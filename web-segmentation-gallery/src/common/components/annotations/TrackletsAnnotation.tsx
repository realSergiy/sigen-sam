/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import TrackletSwimlane from '@/common/components/annotations/TrackletSwimlane';
import useTracklets from '@/common/components/annotations/useTracklets';
import useVideo from '@/common/components/video/editor/useVideo';
import { BaseTracklet } from '@/common/tracker/Tracker';

export default function TrackletsAnnotation() {
  const video = useVideo();
  const tracklets = useTracklets();

  function handleSelectFrame(_tracklet: BaseTracklet, index: number) {
    if (video !== null) {
      video.frame = index;
    }
  }

  return (
    <div className="flex flex-col bg-gray-800 p-4 text-gray-100">
      {tracklets.map(tracklet => (
        <TrackletSwimlane
          key={tracklet.id}
          tracklet={tracklet}
          onSelectFrame={handleSelectFrame}
        />
      ))}
    </div>
  );
}
