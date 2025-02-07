import { ReactNode } from "react";

import "./Button.css";

type ButtonType = {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  type,
  disabled,
  children,
  className,
  onClick,
}: ButtonType) {
  return (
    <div className="container-button">
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
