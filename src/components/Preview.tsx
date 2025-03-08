import { useEffect, useState } from "react";
import type { SoupFormData } from "./SoupForm";
import { TbSoup } from "react-icons/tb";

import Button from "./Button";
import Modal from "./ModalWindow";
import Header from "./Header";

import "./Preview.css";

interface PreviewProps {
  soupFormData: SoupFormData;
  goBack: () => void;
  resetForm: () => void;
}

export default function Preview({
  soupFormData,
  goBack,
  resetForm,
}: PreviewProps) {
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState<string | null>(null);
  const [showUncomonAllergens, setShowUncomonAllergens] = useState<string | "">(
    ""
  );
  const [newAllergens, setNewAllergens] = useState<string[]>([]);

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

  return (
    <div className="preview-container">
      <Header headerTitle="Review" />
      <div className="review-container print">
        <div className="title-logo-container">
          <h1 className="soup-title">Chef's featured soup</h1>
          <TbSoup className="soup-logo" />
          <p className="soup-name">{soupFormData.soupName}</p>
        </div>
        <p className="preview-label">Description:</p>
        <p className="preview-text">{soupFormData.description}</p>
        <p className="preview-label">Garnish:</p>
        <p className="preview-text">{soupFormData.garnish}</p>
        <p className="preview-label">Ingredients:</p>
        <p className="preview-text">{soupFormData.ingredients}</p>
        {newAllergens.length ? (
          <>
            <p className="preview-label">Allergens:</p>
            <div className="preview-text">
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
            <p className="preview-label">Less common allergens:</p>
            <p className="preview-text">{soupFormData.otherAllergens}</p>
          </>
        )}
        <br />
        <br />
        <div className="container-buttons no-print">
          <Button
            className="button-edit"
            type="button"
            onClick={goBack}
            printEdit="edit"
          >
            Edit
          </Button>
          <Button
            className="button-print"
            type="button"
            printEdit="print"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </Button>
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
