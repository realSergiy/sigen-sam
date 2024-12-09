'use client';

import RelayEnvironmentProvider from '@/graphql/RelayEnvironmentProvider';
import { VIDEO_API_ENDPOINT } from '@/demo/DemoConfig';
import DemoSuspenseFallback from '@/demo/DemoSuspenseFallback';
import DemoErrorFallback from '@/demo/DemoErrorFallback';
import SAM2DemoPage from '@/routes/DemoPageWrapper';

export default function Page() {
  return (
    <RelayEnvironmentProvider
      endpoint={VIDEO_API_ENDPOINT}
      suspenseFallback={<DemoSuspenseFallback />}
      errorFallback={DemoErrorFallback}
    >
      <SAM2DemoPage />
    </RelayEnvironmentProvider>
  );
}
