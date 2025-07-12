'use client';

import { Button } from '@/components/ui/button';

import Container from '@/app/[topic]/[slug]/_components/container';

import ExampleRemoteTriggerDialog from './_components/example-remote-trigger-dialog';

const BasicExample = () => {
  return (
    <Container>
      <ExampleRemoteTriggerDialog>
        <Button>Open</Button>
      </ExampleRemoteTriggerDialog>
    </Container>
  );
};

export default BasicExample;
