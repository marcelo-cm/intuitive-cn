# Usage

```tsx
const ExampleTriggeredDialog = ({
  children,
  open,
  onOpenChange,
}: RemoteTriggerProps) => {
  if (!children && !open && !onOpenChange) {
    throw new Error(
      'A dialog must be opened by a child as a trigger or by states',
    );
  }

  const [isOpen, handleOpenChange] = useRemoteTrigger({
    open,
    onOpenChange,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```