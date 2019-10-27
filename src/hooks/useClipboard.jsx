import { useState } from 'react';

const useClipboard = initialStatus => {
  const [clipboardStatus, setClipboardStatus] = useState(initialStatus);

  const updateClipboard = newClip => {
    navigator.clipboard.writeText(newClip).then(
      () => {
        setClipboardStatus(true);
      },
      () => {
        setClipboardStatus(false);
      }
    );
  };

  const copyToClipboard = text => {
    navigator.permissions
      .query({ name: 'clipboard-write' })
      .then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          updateClipboard(text);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return {
    clipboardStatus,
    copyToClipboard,
    setClipboardStatus,
  };
};

export default useClipboard;
