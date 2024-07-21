import { LinkLabelProps } from "./index.types";

export const LinkLabel = ({ className, label }: LinkLabelProps) => {
  return (<p className={className}>{label}</p>);
}