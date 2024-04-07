import {
  createContext,
  useState,
  useContext,
  useCallback,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
import { Overlay } from './Overlay';
import { OverlayContent, OverlayOpenFn, OverlayOption, OverlaySubmitResult } from './Overlay.type';

export const OverlayContext = createContext<OverlayOpenFn | null>(null);

const defaultOverlayOption: OverlayOption = {
  closeOverlayClick: false,
  placement: 'center',
};

type OverlayState = {
  content: OverlayContent;
  options: OverlayOption;
  key: string;
  resolver: (value: unknown) => void;
};

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlays, setOverlays] = useState<OverlayState[]>([]);
  const [overlayCounter, setOverlayCounter] = useState(0);

  const openOverlay: OverlayOpenFn = useCallback(
    (content, option) => {
      setOverlayCounter((prevModalCounter) => prevModalCounter + 1);
      const key = `modal-${overlayCounter}`;

      setOverlays((prevOverlays) => [
        ...prevOverlays,
        {
          content,
          options: { ...defaultOverlayOption, ...(option ?? {}) },
          key,
          resolver: () => {},
        },
      ]);

      return new Promise((resolve) => {
        setOverlays((prevOverlays) =>
          prevOverlays.map((prevOverlay) =>
            prevOverlay.key === key
              ? {
                  ...prevOverlay,
                  resolver: resolve,
                }
              : prevOverlay,
          ),
        );
      });
    },
    [overlayCounter],
  );

  const closeOverlay = (key: string) => {
    const targetOverlay = overlays.find((modal) => modal.key === key);
    if (targetOverlay) {
      targetOverlay.resolver(false);
    }
    setOverlays((prevOverlays) => prevOverlays.filter((modal) => modal.key !== key));
  };

  const submitOverlay = (key: string, result: OverlaySubmitResult) => {
    const targetOverlay = overlays.find((modal) => modal.key === key);
    if (targetOverlay) {
      targetOverlay.resolver(result);
      closeOverlay(key);
    }
  };

  return (
    <OverlayContext.Provider value={openOverlay}>
      {children}
      {overlays.map(({ content, options, key }, index) => {
        const hiddenStatus = index < overlays.length - 1;
        const overlayStyle = hiddenStatus ? { display: 'none' } : {};
        const handleOverlayClose = () => closeOverlay(key);

        const handleOverlaySubmit = (submitResult: OverlaySubmitResult) => submitOverlay(key, submitResult);
        return (
          <Overlay
            key={key}
            opened
            onClose={handleOverlayClose}
            onSubmit={handleOverlaySubmit}
            closeOverlayClick={options.closeOverlayClick}
            placement={options.placement}
            style={overlayStyle}
          >
            {typeof content === 'function'
              ? content({ onClose: handleOverlayClose, onSubmit: handleOverlaySubmit })
              : isValidElement(content) &&
                cloneElement(content as ReactElement, {
                  onClose: handleOverlayClose,
                  onSubmit: handleOverlaySubmit,
                })}
          </Overlay>
        );
      })}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('useOverlay를 사용하려면 OverlayProvider를 상위에 제공해야 합니다.');
  }

  return context;
};
