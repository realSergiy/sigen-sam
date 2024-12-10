export default function Loading() {
  return (
    <div className="text-vercel-pink space-y-4">
      <h2 className="text-lg font-bold">Not Found</h2>

      <p className="text-sm">Loading...</p>
    </div>
  );
}

/*

'use client';

import LoadingStateScreen from '@/common/loading/LoadingStateScreen';

export const Loading = () => {
  return (
    <LoadingStateScreen
      title="Loading demo..."
      description="This may take a few moments, you're almost there!"
    />
  );
};

*/
