import { Fragment } from 'react';

import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'the repository',
  description:
    'patterns, code snippets, and basic practices for design engineering.',
};

const RepositoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      {children}
    </Fragment>
  );
};

export default RepositoryLayout;
