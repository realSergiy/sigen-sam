import { PropsWithChildren } from 'react';

export default function ToolbarBottomActionsWrapper({
  children,
}: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between px-6 pb-6 pt-4 md:pt-2">
      {children}
    </div>
  );
}
