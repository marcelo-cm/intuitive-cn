# Usage

```tsx
const UseCopyToClipboardExample: React.FC = () => {
  const { handleCopy, isCopied, error } = useCopyToClipboard('Hello, world!');

  return (
    <div className="flex flex-col gap-4">
      <Container>
        <Button
          onClick={handleCopy}
          variant={isCopied ? Variant.SUCCESS : Variant.PRIMARY}
          TrailingIcon={isCopied ? CheckIcon : CopyIcon}
        >
          {isCopied ? 'Copied!' : 'Copy  to clipboard'}
        </Button>
      </Container>
    </div>
  );
};

export default BasicExample;
```
