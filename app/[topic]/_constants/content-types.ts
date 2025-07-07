import { ElementType } from 'react';

export interface IContentItem {
  Icon: ElementType;
  title: string;
  description?: string;
  href: string;
}

export interface IContentGroup {
  Icon: ElementType;
  title: string;
  items: IContentItem[];
}

export interface IContentConfig {
  title: string;
  description?: string;
  content: (_IContentMarkdown | _IContentExample)[];
}

interface _IContentExample {
  type: 'example';
  component: React.FC | React.JSX.Element | React.ReactNode;
}

interface _IContentMarkdown {
  type: 'markdown';
  id: string;
}
