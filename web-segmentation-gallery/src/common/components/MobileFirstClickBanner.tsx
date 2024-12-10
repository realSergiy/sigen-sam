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
import ChangeVideoModal from '@/common/components/gallery/ChangeVideoModal';
import { DEMO_SHORT_NAME } from '@/demo/DemoConfig';
import { ImageCopy } from '@carbon/icons-react';
import { Button } from 'react-daisyui';

export default function MobileFirstClickBanner() {
  return (
    <div className="relative flex flex-col gap-4 bg-black px-5 py-6">
      <div className="flex text-lg text-white">
        Click an object in the video to start
      </div>
      <div className="text-sm text-[#A7B3BF]">
        <p>
          You&apos;ll be able to use {DEMO_SHORT_NAME} to make fun edits to any
          video by tracking objects and applying visual effects. To start, click
          any object in the video.
        </p>
      </div>
      <div className="flex items-center">
        <ChangeVideoModal
          videoGalleryModalTrigger={MobileVideoGalleryModalTrigger}
          showUploadInGallery={true}
        />
      </div>
    </div>
  );
}

type MobileVideoGalleryModalTriggerProps = {
  onClick: () => void;
};

function MobileVideoGalleryModalTrigger({
  onClick,
}: MobileVideoGalleryModalTriggerProps) {
  return (
    <Button
      color="ghost"
      startIcon={<ImageCopy size={20} />}
      onClick={onClick}
      className="p-0 text-white"
    >
      Change video
    </Button>
  );
}
