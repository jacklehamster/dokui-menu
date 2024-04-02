interface Props {
  label?: string;
}

export function Label({ label }: Props) {
  return label && <div style={{ margin: 5, textAlign: "center" }}>
    {label}
  </div>;
}
