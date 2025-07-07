import { ElementType } from 'react';

import { ClassValue } from 'clsx';

import { ContentType } from './content-enums';

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
  content: (IContentMarkdown | IContentExample)[];
}

export interface IContentExample {
  type: ContentType.COMPONENT;
  title?: string;
  description?: string;
  component: React.FC | React.JSX.Element | React.ReactNode;
}

export interface IContentMarkdown {
  type: ContentType.MARKDOWN;
  id: string;
  className?: ClassValue;
}
