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
import useMessagesSnackbar from '@/common/components/snackbar/useDemoMessagesSnackbar';
import useVideo from '@/common/components/video/editor/useVideo';
import { activeTrackletObjectIdAtom, labelTypeAtom } from '@/demo/atoms';
import { Add } from '@carbon/icons-react';
import { useSetAtom } from 'jotai';

export default function AddObjectButton() {
  const video = useVideo();
  const setActiveTrackletId = useSetAtom(activeTrackletObjectIdAtom);
  const setLabelType = useSetAtom(labelTypeAtom);
  const { enqueueMessage } = useMessagesSnackbar();

  async function addObject() {
    enqueueMessage('addObjectClick');
    const tracklet = await video?.createTracklet();
    if (tracklet != null) {
      setActiveTrackletId(tracklet.id);
      setLabelType('positive');
    }
  }

  return (
    <div
      onClick={addObject}
      className="group mx-4 flex cursor-pointer justify-start !rounded-xl border-none bg-transparent px-4 text-white"
    >
      <div className="flex items-center gap-6">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white group-hover:bg-graydark-700 md:h-20 md:w-20">
          <Add size={36} className="text-gray-300 group-hover:text-white" />
        </div>
        <div className="text-base font-medium">Add another object</div>
      </div>
    </div>
  );
}
