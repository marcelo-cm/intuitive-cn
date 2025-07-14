# What & Why?

The `useRemoteTrigger` hook provides a simple way to control dialogs, sheets, or similar components using either local state (clicking a trigger) or external props (`open` and `onOpenChange`).

It internally manages `isOpen` state and keeps it synchronized with the `open` prop via `useEffect`. Whenever `open` changes externally, the hook updates the internal state to reflect it. The returned `handleOpenChange` callback updates both the internal state and calls `onOpenChange`, ensuring external and internal state stay in sync.

This dual approach allows you to build components that:

- Work as uncontrolled components with internal state (e.g., opened by a button).
- Switch to controlled mode when `open` and `onOpenChange` are provided by a parent.

By returning `[isOpen, handleOpenChange]`, the hook makes it easy to integrate with libraries like Radix UI that expect `open` and `onOpenChange`, enabling flexible and predictable state management without extra boilerplate.

# Code

```tsx
interface UseRemoteTriggerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface RemoteTriggerProps extends UseRemoteTriggerProps {
  children?: React.ReactNode;
}

export const useRemoteTrigger = ({
  open,
  onOpenChange,
}: UseRemoteTriggerProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  return [isOpen, handleOpenChange] as const;
};
```
