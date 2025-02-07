import { useEffect, useState } from "react";
import type { SoupFormData } from "./SoupForm";
import { TbSoup } from "react-icons/tb";

import Button from "./Button";

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
  const [showFinalMessage, setShowFinalMessage] = useState<string | null>(null);
  const [showUncomonAllergens, setShowUncomonAllergens] = useState<string | "">(
    ""
  );
  const [newAllergens, setNewAllergens] = useState<string[]>([]);

  const allergensIngredients = soupFormData.allergens ?? [];

  useEffect(() => {
    if (soupFormData.otherAllergens) {
      // console.log("there is other");
      setShowUncomonAllergens(soupFormData.otherAllergens);
    } else {
      // console.log("there is no other");
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
    return <p className="final-message">{showFinalMessage}</p>;
  }

  return (
    <div className="preview-container print">
      <h1 className="soup-title">{soupFormData.title}</h1>
      <TbSoup className="soup-logo" />
      <p className="soup-name">{soupFormData.soupName}</p>
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
          <p className="preview-label">Uncomon allergens:</p>
          <p className="preview-text">{soupFormData.otherAllergens}</p>
        </>
      )}
      <div className="container-buttons">
        <div className="edit">
          <Button className="button no-print" type="button" onClick={goBack}>
            Edit
          </Button>
        </div>
        <div className="print">
          <Button
            className="button no-print"
            type="button"
            onClick={() => {
              window.print();
              resetForm();
              setShowFinalMessage("Thank you for using 'Soupe du jour'.");
            }}
          >
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
