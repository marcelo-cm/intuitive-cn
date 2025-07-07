'use client';

import { Button } from '@/components/intuitive-ui/(native)/button';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const BasicExample: React.FC = () => {
  const { handleCopy } = useCopyToClipboard('Hello, world!');

  return <Button onClick={handleCopy}>Copy to clipboard</Button>;
};

export default BasicExample;
