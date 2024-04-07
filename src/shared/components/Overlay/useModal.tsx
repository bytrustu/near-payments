import { OverlayContent, OverlayOption } from './Overlay.type.ts';
import { useOverlay } from './OverlayProvider.tsx';

export const useModal = () => {
  const showOverlay = useOverlay();
  return async <T = any,>(content: OverlayContent<T>, options?: OverlayOption): Promise<T> => {
    const submitResult = await showOverlay(content, options);
    return submitResult as T;
  };
};
