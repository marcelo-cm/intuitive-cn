import React from 'react';

import Link from 'next/link';

import { IBlogPost } from '@/app/simplexity/_utils/content-utils';

const BlogLink = (props: IBlogPost) => {
  return (
    <Link
      className="group flex flex-col rounded-md"
      href={`/simplexity/${props.id}`}
    >
      <div className="flex flex-col justify-between md:flex-row md:gap-2">
        <h3 className="text-foreground group-active:text-accent-foreground cursor-pointer group-hover:underline">
          {props.title}
        </h3>
        <p className="text-muted-foreground break-keep whitespace-nowrap">
          {props.date}
        </p>
      </div>
      <div className="text-muted-foreground">
        <p>{props.description}</p>
      </div>
    </Link>
  );
};

export default BlogLink;
