export interface IExperience {
  title: string;
  company: string;
  link: string;
  description: {
    short: string;
    long?: string;
  };
  time: string;
}

export const EXPERIENCES: IExperience[] = [
  {
    title: 'Founding Design Engineer',
    company: 'Gumloop',
    link: 'https://www.gumloop.com/',
    description: {
      short: 'Making everyone an AI engineer',
      long: 'Gumloop is a platform that allows you to create and share AI agents. I was the founding design engineer and helped build the product from the ground up.',
    },
    time: '04.2025 — Present',
  },
  {
    title: 'Founder',
    company: 'Intuitive Labs',
    link: 'https://www.intuitivelabs.co/',
    description: {
      short:
        "Engineering & design studio. Our clients raise millions from industry leading VC's, rank on the App Store, and get acquired by private equity firms.",
    },
    time: '06.2024 — 03.2025',
  },
];
