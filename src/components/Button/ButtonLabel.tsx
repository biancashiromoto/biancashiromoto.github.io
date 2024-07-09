interface ButtonLabelProps {
  label: string,
}

export const ButtonLabel = ({ label }: ButtonLabelProps) => {
  return (
    <p>{ label }</p>
  )
}