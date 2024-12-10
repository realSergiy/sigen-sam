import { Close } from '@carbon/icons-react';
import { PropsWithChildren, ReactNode } from 'react';

type ToolbarObjectContainerProps = PropsWithChildren<{
  alignItems?: 'top' | 'center';
  isActive: boolean;
  title: string;
  subtitle: string;
  thumbnail: ReactNode;
  isMobile: boolean;
  onCancel?: () => void;
  onClick?: () => void;
}>;

export default function ToolbarObjectContainer({
  alignItems = 'top',
  children,
  isActive,
  title,
  subtitle,
  thumbnail,
  isMobile,
  onClick,
  onCancel,
}: ToolbarObjectContainerProps) {
  if (isMobile) {
    return (
      <div onClick={onClick} className="flex items-center px-5 pb-10">
        <div className="flex-grow items-center">{children}</div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`container px-8 pb-8 ${
        isActive ? 'mx-4 mb-8 rounded-lg bg-black py-4' : ''
      } ${alignItems === 'center' ? 'items-center' : ''}`}
    >
      {thumbnail}
      <div className="ml-4 flex-grow items-center">
        <div className="text-md ml-2 font-semibold">{title}</div>
        {subtitle.length > 0 && (
          <div className="ml-2 mt-2 text-sm leading-5 text-gray-400">
            {subtitle}
          </div>
        )}
        {children}
      </div>
      {onCancel != null && (
        <div className="items-start self-stretch" onClick={onCancel}>
          <Close size={32} />
        </div>
      )}
    </div>
  );
}
