import React, { useCallback, useEffect, useRef } from 'react';
import NewWindow from 'react-new-window';

const windowFeatures = {
  height: '200px',
  width: '200px',
};

const CaptureArea = props => {
  const elRef = useRef();

  useEffect(() => {
    if (elRef.current) {
      elRef.current.focus();
    }
  });

  return <div {...props} ref={elRef} />;
};

const MOUSE_BUTTON_MAP = {
  0: 'LEFTCLICK',
  1: 'MIDDLECLICK',
  2: 'RIGHTCLICK',
  3: 'BROWSERBACK',
  4: 'BROWSERFORWARD',
};

/* eslint-disable sort-keys */
const NUMPAD_MAP = {
  0: 'Numpad0',
  1: 'Numpad1',
  2: 'Numpad2',
  3: 'Numpad3',
  4: 'Numpad4',
  5: 'Numpad5',
  6: 'Numpad6',
  7: 'Numpad7',
  8: 'Numpad8',
  9: 'Numpad9',
  Enter: 'NumpadEnter',
  '.': 'NumpadDecimal',
  '/': 'NumpadDivide',
  '*': 'NumpadMultiply',
  '-': 'NumpadSubtract',
  '+': 'NumpadAdd',
};
/* eslint-enable sort-keys */

const DetectButtonWindow = ({
  onCancel,
  isCapturing,
  name = 'capture-button',
  onBlock,
  onCapture,
}) => {
  const handleMouseDown = useCallback(
    event => {
      const { button } = event;
      const result = MOUSE_BUTTON_MAP[button] || `mouse${button}`;
      onCapture(result);
    },
    [onCapture]
  );

  const handleKeyDown = useCallback(
    event => {
      const { location, key } = event;
      if (location === 3) {
        onCapture(NUMPAD_MAP[key]);
      } else {
        onCapture(key);
      }
    },
    [onCapture]
  );

  return (
    isCapturing && (
      <NewWindow
        center="parent"
        copyStyles={false}
        features={windowFeatures}
        name={name}
        onBlock={onBlock}
        onUnload={onCancel}
        title="Capture Button Press"
      >
        <CaptureArea
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          style={{
            border: '1px solid black',
            height: '99%',
            position: 'relative',
            width: '99%',
          }}
          tabIndex="0"
        >
          <span
            style={{
              display: 'block',
              fontFamily: `-apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'`,
              fontWeight: '600',
              margin: 'auto',
              position: 'absolute',
              textAlign: 'center',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100%',
            }}
          >
            Click Inside Here
          </span>
        </CaptureArea>
      </NewWindow>
    )
  );
};

export default DetectButtonWindow;
