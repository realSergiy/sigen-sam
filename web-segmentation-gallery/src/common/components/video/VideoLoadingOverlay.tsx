import { Loading } from 'react-daisyui';

type Props = {
  label?: string;
};

export default function VideoLoadingOverlay({ label }: Props) {
  return (
    <div className="absolute h-full w-full bg-black bg-opacity-50">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-4 text-white">
        <Loading size="sm" />
        <div className="text-sm font-medium text-white">
          {label ?? 'Loading video...'}
        </div>
      </div>
    </div>
  );
}
