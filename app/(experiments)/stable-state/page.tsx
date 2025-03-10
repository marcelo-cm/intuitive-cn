import React from 'react';

import StableStateViewWrapper from './_components/view';

interface IAppData {
  name: string;
  age: number;
}

const fetchUser = async (): Promise<IAppData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John', age: 20 });
    }, 1000);
  });
};

const StableStatePage = async () => {
  const data = await fetchUser();

  return <StableStateViewWrapper data={data} />;
};

export default StableStatePage;
