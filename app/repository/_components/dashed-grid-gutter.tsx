import { Fragment } from 'react';

const DashedGridGutter = () => {
  return (
    <Fragment>
      <div className="grid-line-horizontal fixed top-3 left-0 sm:top-10" />
      <div className="grid-line-horizontal fixed bottom-3 left-0 sm:bottom-10" />
      <div className="grid-line-vertical fixed top-0 right-3 sm:right-10" />
      <div className="grid-line-vertical fixed top-0 left-3 sm:left-10" />
    </Fragment>
  );
};

export default DashedGridGutter;
