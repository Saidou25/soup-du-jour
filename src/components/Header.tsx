import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from "react-icons/bs";

import "./Header.css";

type HeaderProps = {
  headerTitle: string;
  onHomeClick?: () => void;
  homeLabel?: string;
};

export default function Header({
  headerTitle,
  onHomeClick,
  homeLabel = "Soup du Jour",
}: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.body.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div className="container-header no-print">
      <div className="container-fluid py-3 px-0">
        <div className="row g-2 align-items-center">
          <div className="col-6">
            {onHomeClick ? (
              <button
                type="button"
                className="btn btn-link p-0 ps-3 wordmark text-start"
                onClick={onHomeClick}
              >
                <span className="brand-mark" />
                <h1 className="brand-text">{homeLabel}</h1>
                <span className="brand-subtitle">Chef Life Simplified</span>
              </button>
            ) : (
              <span className="wordmark text-start ps-3">
                <span className="brand-mark" />
                <h1 className="brand-text">{homeLabel}</h1>
                <span className="brand-subtitle">Chef Life Simplified</span>
              </span>
            )}
          </div>
          <div className="col-6 d-flex justify-content-end pe-3">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
            >
              {theme === "light" ? <BsMoonFill /> : <BsSun />}
            </button>
          </div>
          <div className="col-12">
            <h1 className="header-text text-center">{headerTitle}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
