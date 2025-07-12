import { TABLE_OF_CONTENTS_ITEMS } from '../[topic]/_constants/content-constants';
import TableOfContentsSection from './table-of-contents-section';

const TableOfContents = () => {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {TABLE_OF_CONTENTS_ITEMS.map((group) => (
        <TableOfContentsSection key={group.title} group={group} />
      ))}
    </div>
  );
};

export default TableOfContents;
