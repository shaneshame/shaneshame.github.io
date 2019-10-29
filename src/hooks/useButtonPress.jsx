import { useCallback, useState } from 'react';

/*
DEPRECATED
- Using `DetectButtonWindow` instead
- This needs the button logic updated to match
*/

const mouseButtonNames = {
  0: 'LEFTCLICK',
  1: 'MIDDLECLICK',
  2: 'RIGHTCLICK',
  3: 'BROWSERBACK',
  4: 'BROWSERFORWARD',
};

const useButtonCapture = (onCapture, settings = {}) => {
  const { continuous = false } = settings;
  const [isCapturing, setCapturing] = useState(false);
  const [buttonResult, setButtonResult] = useState();

  const downHandler = useCallback(
    event => {
      const { button, key } = event;

      const result = key || mouseButtonNames[button] || `button${button}`;

      setButtonResult(result);
      onCapture(result);

      if (!continuous) {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('mousedown', downHandler);
        setCapturing(false);
      }
    },
    [continuous, onCapture]
  );

  const startCapture = () => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('mousedown', downHandler);
    setCapturing(true);
  };

  const stopCapture = useCallback(() => {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('mousedown', downHandler);
    setCapturing(false);
  }, [downHandler]);

  return {
    button: buttonResult,
    isCapturing,
    startCapture,
    stopCapture,
  };
};

export default useButtonCapture;
