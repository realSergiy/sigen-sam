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
import { OBJECT_TOOLBAR_INDEX } from '@/common/components/toolbar/ToolbarConfig';
import useToolbarTabs from '@/common/components/toolbar/useToolbarTabs';
import { streamingStateAtom } from '@/demo/atoms';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { Loading } from 'react-daisyui';

const TOTAL_DEMO_STEPS = 3;

export default function ToolbarProgressChip() {
  const [toolbarIndex] = useToolbarTabs();
  const streamingState = useAtomValue(streamingStateAtom);

  const showLoader = useMemo(() => {
    return streamingState === 'partial' || streamingState === 'requesting';
  }, [streamingState]);

  function getStepValue() {
    if (toolbarIndex === OBJECT_TOOLBAR_INDEX) {
      return streamingState !== 'full' ? 1 : 2;
    }
    return 3;
  }

  return (
    <span className="mr-2 inline-flex h-5 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-black md:h-6 md:w-12 md:text-sm">
      {showLoader ? (
        <Loading className="w-2 md:w-4" />
      ) : (
        `${getStepValue()}/${TOTAL_DEMO_STEPS}`
      )}
    </span>
  );
}
