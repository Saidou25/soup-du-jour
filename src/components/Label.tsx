import "./Label.css";

interface LabelProps {
  label: string;
  htmlFor: string;
}
export default function Label({ label, htmlFor }: LabelProps) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {label}
    </label>
  );
}
