import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export default function DemoPageLayout({ children }: Props) {
  return (
    <div className="flex h-full w-full flex-col-reverse items-stretch md:flex-row md:gap-12 md:px-12 md:py-4">
      {children}
    </div>
  );
}
