interface LinkLabelProps {
  label?: string;
}

export const LinkLabel = ({label}: LinkLabelProps) => {
  return (<p>{label}</p>);
}