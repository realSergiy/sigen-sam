import useScreenSize from '@/common/screen/useScreenSize';
import { Close } from '@carbon/icons-react';
import { useAtomValue } from 'jotai';
import { Loading, RadialProgress } from 'react-daisyui';
import { messageAtom } from './snackbarAtoms';
import useExpireMessage from './useExpireMessage';
import useMessagesSnackbar from './useMessagesSnackbar';

export default function MessagesSnackbar() {
  const message = useAtomValue(messageAtom);
  const { clearMessage } = useMessagesSnackbar();
  const { isMobile } = useScreenSize();

  useExpireMessage();

  if (message == null) {
    return null;
  }

  const closeIcon = (
    <Close
      size={24}
      color={message.type === 'warning' ? 'rgb(17 24 39)' : 'white'}
      opacity={1}
      className="color-white z-20 shrink-0 cursor-pointer !opacity-100 hover:text-gray-300"
      onClick={clearMessage}
    />
  );

  return (
    <div
      className={`${
        isMobile ? 'absolute bottom-2 left-2 right-2' : 'absolute right-2 top-2'
      }`}
    >
      <div
        className={`max-w-md rounded-lg border-2 p-5 text-sm text-white ${
          message.type === 'warning'
            ? 'bg-yellow-500 text-gray-900'
            : 'bg-gradient-to-r from-yellow-400 to-teal-500'
        }`}
      >
        <div className="flex items-center gap-2">
          <div>{message.text}</div>
          {message.type === 'loading' && <Loading size="xs" variant="dots" />}
          {message.showClose && (
            <div className="flex items-start self-stretch">
              {message.expire ? (
                <RadialProgress
                  value={message.progress * 100}
                  size="32px"
                  thickness="2px"
                  className="flex-shrink-0 text-white opacity-10"
                >
                  {closeIcon}
                </RadialProgress>
              ) : (
                closeIcon
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
