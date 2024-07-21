interface LinkLabelProps {
  className?: string;
  label?: string;
}

export const LinkLabel = ({ className, label }: LinkLabelProps) => {
  return (<p className={className}>{label}</p>);
}