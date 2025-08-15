'use client';

import React from 'react';

import { useHasMounted } from '@/hooks/use-has-mounted';

import Container from '@/app/repository/[topic]/[slug]/_components/container';

const BasicExample: React.FC = () => {
  const hasMounted = useHasMounted();

  return (
    <Container>
      <p className="text-muted-foreground text-sm">
        {hasMounted ? 'Mounted on client' : 'Not yet mounted'}
      </p>
    </Container>
  );
};

export default BasicExample;
