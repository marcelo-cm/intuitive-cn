interface ISectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: ISectionHeaderProps) => {
  return (
    <p className="text-muted-foreground mb-4 font-mono text-sm leading-tight font-medium uppercase">
      {title}
    </p>
  );
};

export default SectionHeader;
