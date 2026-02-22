import { ReactNode } from "react";

import "./Button.css";

type ButtonType = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  printEdit?: string;
  onClick?: () => void;
};

export default function Button({
  type,
  disabled,
  children,
  className,
  printEdit,
  onClick,
}: ButtonType) {
  return (
    <div className="button-wrap">
      <button
        className={`${className} ${disabled ? "disabled" : ""}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
