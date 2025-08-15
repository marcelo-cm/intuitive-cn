import { EXPERIENCES } from '../_constants/experience';
import ExperienceListItem from './experience-list-item';

const ExperienceList = () => {
  return (
    <div className="flex grow flex-col gap-4">
      {EXPERIENCES.map((experience) => (
        <ExperienceListItem key={experience.title} {...experience} />
      ))}
    </div>
  );
};

export default ExperienceList;
