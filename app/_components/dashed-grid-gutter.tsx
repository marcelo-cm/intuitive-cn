import { Fragment } from 'react';

const DashedGridGutter = () => {
  return (
    <Fragment>
      <div className="border-border absolute top-7 left-0 h-px w-dvw border-b border-dashed sm:top-10" />
      <div className="border-border absolute bottom-7 left-0 h-px w-dvw border-b border-dashed sm:bottom-10" />
      <div className="border-border absolute top-0 right-7 h-dvh w-px border-r border-dashed sm:right-10" />
      <div className="border-border absolute top-0 left-7 h-dvh w-px border-r border-dashed sm:left-10" />
    </Fragment>
  );
};

export default DashedGridGutter;
