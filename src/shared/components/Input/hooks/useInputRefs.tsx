import { useRef } from 'react';
import { range } from '../../../utils';

export const useInputRefs = (count: number) => range(count).map(() => useRef<HTMLInputElement | null>(null));
