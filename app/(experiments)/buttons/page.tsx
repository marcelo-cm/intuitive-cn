import { Metadata } from 'next';

import ButtonsView from './_components/buttons-view';

export const metadata: Metadata = {
  title: 'Buttons',
  description: 'Buttons page',
};

export default async function ButtonsPage() {
  return <ButtonsView />;
}
