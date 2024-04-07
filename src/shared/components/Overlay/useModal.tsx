import { OverlayContent, OverlayOption } from './Overlay.type';
import { useOverlay } from './OverlayProvider';

export const useModal = () => {
  const showOverlay = useOverlay();
  return async <T = any,>(content: OverlayContent<T>, options?: OverlayOption): Promise<T> => {
    const submitResult = await showOverlay(content, options);
    return submitResult as T;
  };
};
