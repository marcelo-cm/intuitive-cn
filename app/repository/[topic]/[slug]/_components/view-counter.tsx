'use client';

import React, { useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';

interface IViewCounterProps {
  topic: string;
  slug: string;
}

const ViewCounter: React.FC<IViewCounterProps> = ({ topic, slug }) => {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    if (!slug || !topic || isDev) return; // Don't fetch in development

    const fetchViews = async () => {
      const response = await fetch(`/api/blog-views/${topic}/${slug}`);
      const { views } = await response.json();
      setViews(views);
    };

    fetchViews();
  }, [slug, topic]);

  return (
    <div className="text-muted-foreground flex flex-row items-center">
      {views === 0 ? (
        <div className="bg-muted-foreground/50 mx-1 h-4 w-6 animate-pulse rounded" />
      ) : (
        views
      )}{' '}
      views
    </div>
  );
};

export default ViewCounter;
