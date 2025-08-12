import { useEffect, useRef } from 'react';

interface IUseAutoFocusedInputProps {
  onEscape?: () => void;
  onEnter?: () => void;
  blurKeys?: string[];
}

export const useAutoFocusedInput = ({
  onEscape,
  onEnter,
  blurKeys = ['Escape', 'Enter'],
}: IUseAutoFocusedInputProps = {}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (blurKeys.includes(e.key)) {
        if (e.key === 'Escape') {
          onEscape?.();
        }

        if (e.key === 'Enter') {
          onEnter?.();
        }

        inputRef.current?.blur();
        return;
      }

      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [blurKeys, onEscape, onEnter]);

  return inputRef;
};
