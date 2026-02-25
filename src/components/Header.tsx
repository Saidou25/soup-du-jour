import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from "react-icons/bs";

import "./Header.css";

type HeaderProps = {
  headerTitle: string;
  headerSubtitle?: string;
  onHomeClick?: () => void;
  homeLabel?: string;
};

type ThemeMode = "light" | "dark" | "default";

export default function Header({
  headerTitle,
  headerSubtitle,
  onHomeClick,
  homeLabel = "Soup du Jour",
}: HeaderProps) {
  const [theme, setTheme] = useState<ThemeMode>("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ?? (prefersDark ? "dark" : "default");
    setTheme(initialTheme);
    document.body.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "default" : "light";
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
              aria-label="Cycle theme"
            >
              {theme === "default" ? (
                <span className="theme-toggle-duo">
                  <BsMoonFill />
                  <BsSun />
                </span>
              ) : theme === "dark" ? (
                <BsMoonFill />
              ) : (
                <BsSun />
              )}
            </button>
          </div>
          <div className="col-12">
            <h1 className="header-text text-center">
              <span className="header-title-main">{headerTitle}</span>
              {headerSubtitle ? (
                <span className="header-title-sub">{headerSubtitle}</span>
              ) : null}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
