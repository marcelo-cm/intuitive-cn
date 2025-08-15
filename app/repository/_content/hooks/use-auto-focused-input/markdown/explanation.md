---
title: Explanation
---

`useAutoFocusedInput` automatically focuses an input when the user types a non-modifier key anywhere on the page. It also supports blurring the input on `Escape`/`Enter` and optional callbacks for those events. This provides a keyboard-first UX that feels snappy without requiring explicit focusing logic.

# Code

```ts
import { useCallback, useEffect, useRef } from 'react';

export interface IUseAutoFocusedInputProps {
  onEscape?: () => void;
  onEnter?: () => void;
  shouldFocus?: (e: KeyboardEvent) => boolean;
  disabled?: boolean;
}

const SPECIAL_KEYS = [
  'Tab',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'Enter',
  'PageUp',
  'PageDown',
  'Shift',
  'Control',
  'Alt',
  'Meta',
  'CapsLock',
  'AltGraph',
  'NumLock',
  'ScrollLock',
  'ContextMenu',
  'Insert',
  'Delete',
  'Escape',
  'Pause',
  'PrintScreen',
  'Compose',
  'Dead',
];

const BLUR_KEYS = ['Escape', 'Enter'];

function isEditableTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tagName = el.tagName?.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea') return true;
  if (el.isContentEditable) return true;
  if (el.getAttribute('role') === 'textbox') return true;
  return false;
}

/**
 * Automatically focuses a referenced input when the user types, with sensible
 * accessibility guards. It ignores navigation/function keys, modifier combos,
 * composition events, and will not steal focus from existing text inputs.
 */
export function useAutoFocusedInput<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement,
>({
  onEscape,
  onEnter,
  shouldFocus,
  disabled,
}: IUseAutoFocusedInputProps = {}) {
  const inputRef = useRef<T | null>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled || e.isComposing) return;

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Do not hijack focus when the user is already editing text
      if (isEditableTarget(e.target) && e.target !== inputRef.current) {
        return;
      }

      // If the key is in the blurKeys array and the input is currently focused, blur the input
      if (BLUR_KEYS.includes(e.key) && e.target === inputRef.current) {
        inputRef.current?.blur();

        // Call the appropriate callback after blurring
        switch (e.key) {
          case 'Escape':
            onEscape?.();
            break;
          case 'Enter':
            onEnter?.();
            break;
        }

        return;
      }

      // Function keys: F1-F24 and other special keys
      if (SPECIAL_KEYS.includes(e.key) || /^F\d{1,2}$/.test(e.key)) return;

      if (shouldFocus && !shouldFocus(e)) return;

      const element = inputRef.current;
      if (element) {
        if (element.disabled || element.readOnly) return;

        element.focus();
      }
    },
    [onEscape, onEnter, shouldFocus, disabled],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return inputRef;
}
```
