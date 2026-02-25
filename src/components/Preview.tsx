import { useEffect, useRef, useState } from "react";
import type { SoupFormData } from "./SoupForm";
import { TbSoup } from "react-icons/tb";

import Button from "./Button";
import Modal from "./ModalWindow";
import Header from "./Header";

import "./Preview.css";

interface PreviewProps {
  soupFormData: SoupFormData;
  goBack: () => void;
  goHome: () => void;
  resetForm: () => void;
  reviewFontScale: number;
  setReviewFontScale: React.Dispatch<React.SetStateAction<number>>;
  reviewCapsTitle: boolean;
  setReviewCapsTitle: React.Dispatch<React.SetStateAction<boolean>>;
  reviewCapsSoupName: boolean;
  setReviewCapsSoupName: React.Dispatch<React.SetStateAction<boolean>>;
  reviewCapsLabels: boolean;
  setReviewCapsLabels: React.Dispatch<React.SetStateAction<boolean>>;
  reviewCapsBody: boolean;
  setReviewCapsBody: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Preview({
  soupFormData,
  goBack,
  goHome,
  resetForm,
  reviewFontScale,
  setReviewFontScale,
  reviewCapsTitle,
  setReviewCapsTitle,
  reviewCapsSoupName,
  setReviewCapsSoupName,
  reviewCapsLabels,
  setReviewCapsLabels,
  reviewCapsBody,
  setReviewCapsBody,
}: PreviewProps) {
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState<string | null>(null);
  const [showUncomonAllergens, setShowUncomonAllergens] = useState<string | "">(
    ""
  );
  const [newAllergens, setNewAllergens] = useState<string[]>([]);
  const [printScale, setPrintScale] = useState(1);
  const reviewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const allergensIngredients = soupFormData.allergens ?? [];

  const handleClose = () => {
    setShowModalWindow(false);
    setModalMessage("");
  };

  const handleConfirm = () => {
    setShowModalWindow(false);
    setShowFinalMessage("Thank you for using Chefs' Life Made Easy.");
    setModalMessage("");
    resetForm();
  };

  window.onafterprint = () => {
    setShowModalWindow(true);
    setModalMessage("Did the print complete successfully?");
  };

  useEffect(() => {
    const handleBeforePrint = () => {
      if (!reviewRef.current || !contentRef.current) {
        setPrintScale(1);
        return;
      }
      const containerHeight = reviewRef.current.clientHeight;
      const contentHeight = contentRef.current.scrollHeight;
      if (!contentHeight || !containerHeight) {
        setPrintScale(1);
        return;
      }
      const scale = Math.min(1, containerHeight / contentHeight);
      setPrintScale(Number(scale.toFixed(3)));
    };

    const handleAfterPrint = () => {
      setPrintScale(1);
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  useEffect(() => {
    if (soupFormData.otherAllergens) {
      setShowUncomonAllergens(soupFormData.otherAllergens);
    } else {
      setShowUncomonAllergens("");
    }
  }, [soupFormData]);

  useEffect(() => {
    // Removing unwanted "Other" intoduced to "allergensIngredients" when selecting "Other" from the list of allergens checkboxes
    const filteredIngredients = allergensIngredients?.filter(
      (allergensIngredient) => allergensIngredient !== "Other"
    );
    setNewAllergens(filteredIngredients);
  }, [allergensIngredients]);

  if (showFinalMessage) {
    return (
      <div className="container-final">
        <div className="final-div">
          <p className="final-message">{showFinalMessage}</p>
        </div>
      </div>
    );
  }

  const handleFontChange = (delta: number) => {
    setReviewFontScale((prev) => {
      const next = Math.min(1.8, Math.max(0.8, Number((prev + delta).toFixed(2))));
      return next;
    });
  };

  const handleResetFont = () => {
    setReviewFontScale(1);
  };

  return (
    <div className="preview-container print-page">
      <Header
        headerTitle="Review"
        headerSubtitle="your featured soup"
        onHomeClick={goHome}
        homeLabel="CLS"
      />
      <div className="review-page-wrap">
        <div className="review-layout">
          <div className="review-left">
            <div
              className="review-container review-col-left card elevated-card print"
              ref={reviewRef}
              style={
                {
                  "--review-font-scale": reviewFontScale,
                  "--print-scale": printScale,
                } as React.CSSProperties
              }
            >
              <div className="card-body review-content" ref={contentRef}>
                <div className="title-logo-container text-center mb-4">
                  <h1
                    className={`soup-title h3 mb-1 ${
                      reviewCapsTitle ? "caps-title" : ""
                    }`}
                  >
                    Chef's featured soup
                  </h1>
                  <TbSoup className="soup-logo" />
                  <p
                    className={`soup-name mt-2 ${
                      reviewCapsSoupName ? "caps-title" : ""
                    }`}
                  >
                    {soupFormData.soupName}
                  </p>
                </div>
                <p
                  className={`preview-label ${
                    reviewCapsLabels ? "caps-label" : ""
                  }`}
                >
                  Description
                </p>
                <p
                  className={`preview-text ${
                    reviewCapsBody ? "caps-body" : ""
                  }`}
                >
                  {soupFormData.description}
                </p>
                <p
                  className={`preview-label ${
                    reviewCapsLabels ? "caps-label" : ""
                  }`}
                >
                  Garnish
                </p>
                <p
                  className={`preview-text ${
                    reviewCapsBody ? "caps-body" : ""
                  }`}
                >
                  {soupFormData.garnish}
                </p>
                <p
                  className={`preview-label ${
                    reviewCapsLabels ? "caps-label" : ""
                  }`}
                >
                  Ingredients
                </p>
                <p
                  className={`preview-text ${
                    reviewCapsBody ? "caps-body" : ""
                  }`}
                >
                  {soupFormData.ingredients}
                </p>
                {newAllergens.length ? (
                  <>
                    <p
                      className={`preview-label ${
                        reviewCapsLabels ? "caps-label" : ""
                      }`}
                    >
                      Allergens
                    </p>
                    <div
                      className={`preview-text ${
                        reviewCapsBody ? "caps-body" : ""
                      }`}
                    >
                      {newAllergens &&
                        newAllergens.map((newAllergen, index) => (
                          <span key={index}>
                            {index !== newAllergens.length - 1
                              ? `${newAllergen},\u00A0`
                              : `${newAllergen}.`}
                          </span>
                        ))}
                    </div>
                  </>
                ) : null}
                {showUncomonAllergens && (
                  <>
                    <p
                      className={`preview-label ${
                        reviewCapsLabels ? "caps-label" : ""
                      }`}
                    >
                      Less common allergens
                    </p>
                    <p
                      className={`preview-text ${
                        reviewCapsBody ? "caps-body" : ""
                      }`}
                    >
                      {soupFormData.otherAllergens}
                    </p>
                  </>
                )}
                <div className="container-buttons no-print">
                  <Button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={goBack}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                  >
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="review-divider" aria-hidden="true" />
          <div className="review-right">
            <div className="review-tools card elevated-card no-print">
              <div className="card-body">
                <h2 className="h6 mb-1">Text size</h2>
                <p className="tool-subtitle">
                  Adjust the preview text size to match your print preference.
                </p>
                <div className="tool-row">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleFontChange(-0.05)}
                  >
                    A-
                  </button>
                  <div className="tool-value">
                    {Math.round(reviewFontScale * 100)}%
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleFontChange(0.05)}
                  >
                    A+
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-link mt-3 p-0"
                  onClick={handleResetFont}
                >
                  Reset
                </button>
                <hr className="my-3" />
                <h2 className="h6 mb-2">Capitalization</h2>
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="caps-title"
                    checked={reviewCapsTitle}
                    onChange={(e) => setReviewCapsTitle(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="caps-title">
                    Page title
                  </label>
                </div>
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="caps-soup-name"
                    checked={reviewCapsSoupName}
                    onChange={(e) => setReviewCapsSoupName(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="caps-soup-name">
                    Soup name
                  </label>
                </div>
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="caps-labels"
                    checked={reviewCapsLabels}
                    onChange={(e) => setReviewCapsLabels(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="caps-labels">
                    Section labels
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="caps-body"
                    checked={reviewCapsBody}
                    onChange={(e) => setReviewCapsBody(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="caps-body">
                    Body text
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalWindow && (
        <Modal
          onConfirm={handleConfirm}
          onClose={handleClose}
          message={modalMessage}
        />
      )}
    </div>
  );
}
