import "./Label.css";

interface LabelProps {
  label: string;
}
export default function Label({ label }: LabelProps) {
  return (
    <label className="label">
      <span>{label}</span>
    </label>
  );
}
