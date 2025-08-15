import { cn } from '@/lib/utils';

import { IExperience } from '../_constants/experience';

const ExperienceListItem = ({
  title,
  company,
  link,
  description,
  time,
}: IExperience) => {
  return (
    <div className="group/item flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="font-normal text-nowrap break-keep">{title}</p>
          <a
            href={link}
            className="text-muted-foreground active:text-accent-foreground cursor-pointer text-nowrap break-keep hover:underline"
          >
            {company}
          </a>
        </div>
        <p className="text-muted-foreground text-nowrap break-keep">{time}</p>
      </div>
      <p key={description.short} className={cn('text-muted-foreground')}>
        {description.short}
      </p>
    </div>
  );
};

export default ExperienceListItem;
