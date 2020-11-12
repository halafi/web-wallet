// from desktop-wallet
import { useEffect, useState } from 'react';

type ClipboardOptions = {
  resetAfter?: number;
  onSuccess?: any;
  onError?: any;
};

const useClipboard = (options?: ClipboardOptions): [boolean, (data: string | object) => void] => {
  const [hasCopied, setHasCopied] = useState(false);

  const resetAfter = options && options.resetAfter;
  const onSuccess = options && options.onSuccess;
  const onError = options && options.onError;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasCopied && resetAfter) {
      const handler = setTimeout(() => {
        setHasCopied(false);
      }, resetAfter);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [hasCopied, resetAfter]);

  return [
    hasCopied,
    async (data) => {
      try {
        if (typeof data !== 'string') {
          // eslint-disable-next-line no-param-reassign
          data = JSON.stringify(data);
        }

        await navigator.clipboard.writeText(data);

        setHasCopied(true);

        if (onSuccess) {
          onSuccess(data);
        }
      } catch {
        if (onError) {
          onError();
        }
      }
    },
  ];
};

export default useClipboard;
