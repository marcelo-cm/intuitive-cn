import React, { useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { toast } from 'sonner';

import { Button } from './button';
import { Size, Variant } from './enums';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  title,
}) => {
  const [copied, setCopied] = useState(false);

  // Split the code into lines for rendering
  const codeLines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard', {
      closeButton: true,
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-md border border-gray-200">
      {title && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs text-gray-500">{language}</span>
        </div>
      )}

      <div className="relative">
        <pre className="m-0 overflow-x-auto bg-gray-50 p-0">
          <div className="flex">
            <code className="flex-1 overflow-x-auto">
              {codeLines.map((line, i) => (
                <div key={i} className="group flex">
                  <div className="border-r border-gray-200 bg-gray-100 pr-4 pl-4 text-right select-none group-first:pt-4 group-last:pb-4">
                    <div className="my-1 w-4 text-xs leading-none text-gray-500 tabular-nums">
                      {i + 1}
                    </div>
                  </div>
                  <div className="pl-4 text-sm group-first:pt-4 group-last:pb-4">
                    {line || ' '}
                  </div>
                </div>
              ))}
            </code>
          </div>
        </pre>

        <Button
          className="absolute top-2 right-2 p-2 text-xs transition-colors"
          onClick={handleCopy}
          size={Size.XXS}
          icon
          variant={Variant.OUTLINE}
          LeadingIcon={copied ? Check : Copy}
        ></Button>
      </div>
    </div>
  );
};

export default CodeBlock;
