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
import LoadingStateScreen from '@/common/loading/LoadingStateScreen';
import {Cog6ToothIcon} from '@heroicons/react/24/outline';
import stylex from '@stylexjs/stylex';
import {Suspense} from 'react';
import {Button, Indicator} from 'react-daisyui';
import { useRouter } from 'next/router';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100vh',
    backgroundColor: '#000',
  },
  content: {
    position: 'relative',
    flex: '1 1 0%',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
    overflowY: {
      default: 'auto',
      '@media screen and (max-width: 768px)': 'auto',
    },
  },
  debugActions: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 100,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.content)}>
        <Suspense
          fallback={
            <LoadingStateScreen
              title="Loading demo..."
              description="This may take a few moments, you're almost there!"
            />
          }>
          {children}
        </Suspense>
      </div>
      <div {...stylex.props(styles.debugActions)}>
        <Indicator>
          <Button
            color="ghost"
            onClick={() => router.push('/settings')}
            shape="circle"
            size="xs"
            startIcon={<Cog6ToothIcon className="w-4 h-4" />}
            title="Bugnub"
          />
        </Indicator>
      </div>
    </div>
  );
}
