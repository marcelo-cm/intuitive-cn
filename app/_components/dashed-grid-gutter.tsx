import { Fragment } from 'react';

const DashedGridGutter = () => {
  return (
    <Fragment>
      <div className="grid-line-horizontal absolute top-3 left-0 sm:top-10" />
      <div className="grid-line-horizontal absolute bottom-3 left-0 sm:bottom-10" />
      <div className="grid-line-vertical absolute top-0 right-3 sm:right-10" />
      <div className="grid-line-vertical absolute top-0 left-3 sm:left-10" />
    </Fragment>
  );
};

export default DashedGridGutter;
