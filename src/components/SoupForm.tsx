import { ChangeEvent, useEffect, useState } from "react";
import { soupData } from "../data";

import Label from "./Label";
import Allergens from "./Allergens";
import Preview from "./Preview";
import Button from "./Button";
import Header from "./Header";

import "./SoupForm.css";

export interface SoupFormData {
  title: string;
  soupName: string;
  description: string;
  garnish: string;
  ingredients: string;
  allergens?: string[];
  otherAllergens?: string;
  dataLabel: string;
}

type LandingPageProps = {
  backToLandingPage: (value: boolean) => void;
  soupFormData: SoupFormData;
  setSoupFormData: React.Dispatch<React.SetStateAction<SoupFormData>>;
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

export default function SoupForm({
  backToLandingPage,
  soupFormData,
  setSoupFormData,
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
}: LandingPageProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [allergenResetKey, setAllergenResetKey] = useState(0);

  const { title, fields } = soupData;

  // Resetting the Form
  const handleReset = () => {
    setButtonDisabled(true);
    setSubmitAttempted(false);
    setAllergenResetKey((prev) => prev + 1);
    setSoupFormData({
      title: soupData.title,
      soupName: "",
      description: "",
      garnish: "",
      ingredients: "",
      allergens: [],
      otherAllergens: "",
      dataLabel: "",
    });
    setTimeout(() => {
      backToLandingPage(false);
    }, 4000);
  };

  // Clear form without leaving the page
  const handleClearForm = () => {
    setButtonDisabled(true);
    setSubmitAttempted(false);
    setAllergenResetKey((prev) => prev + 1);
    setSoupFormData({
      title: soupData.title,
      soupName: "",
      description: "",
      garnish: "",
      ingredients: "",
      allergens: [],
      otherAllergens: "",
      dataLabel: "",
    });
  };

  //  Handle go back to modify inputs
  const handleGoBack = () => {
    setShowPreview(false);
  };

  // Handles the state changes within input fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoupFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the state changes within textareas
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSoupFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the list of allergens within Allergens component
  const handleAllergens = (data: string[]) => {
    setSoupFormData((prev) => ({ ...prev, allergens: data }));
  };

  // Handle the other allergen not listed as checkbox within Allergens component
  const handleOtherAllergens = (data: string) => {
    setSoupFormData((prev) => ({ ...prev, otherAllergens: data }));
  };

  const isFormValid = () =>
    Boolean(
      soupFormData.soupName?.trim() &&
        soupFormData.description?.trim() &&
        soupFormData.ingredients?.trim() &&
        soupFormData.garnish?.trim()
    );

  // Submit form for print
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isFormValid()) {
      return;
    }
    setShowPreview(true);
  };
  
  useEffect(() => {
    if (isFormValid()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [soupFormData]);

  if (showPreview) {
    return (
      <Preview
        soupFormData={soupFormData}
        goBack={handleGoBack}
        goHome={() => backToLandingPage(true)}
        resetForm={handleReset}
        reviewFontScale={reviewFontScale}
        setReviewFontScale={setReviewFontScale}
        reviewCapsTitle={reviewCapsTitle}
        setReviewCapsTitle={setReviewCapsTitle}
        reviewCapsSoupName={reviewCapsSoupName}
        setReviewCapsSoupName={setReviewCapsSoupName}
        reviewCapsLabels={reviewCapsLabels}
        setReviewCapsLabels={setReviewCapsLabels}
        reviewCapsBody={reviewCapsBody}
        setReviewCapsBody={setReviewCapsBody}
      />
    );
  }

  return (
    <div>
      <Header
        headerTitle="Create your"
        headerSubtitle="featured soup"
        onHomeClick={() => backToLandingPage(true)}
        homeLabel="CLS"
      />
      <div className="container pb-5 pt-4">
        <form className="soup-form card elevated-card" onSubmit={handleFormSubmit}>
          <div className="card-body">
            <h1 className="title h3 mb-4">{title}</h1>
            {fields &&
              fields.map((field) => (
                <div key={field.label} className="mb-3">
                  <Label label={field.label} htmlFor={field.dataLabel} />
                  {field.type === "text" && (
                    <input
                      className="form-control"
                      id={field.dataLabel}
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.dataLabel}
                      value={
                        soupFormData[field.dataLabel as keyof SoupFormData] || ""
                      }
                      onChange={handleInputChange}
                    />
                  )}
                  {field.type === "textArea" && (
                    <textarea
                      className="form-control"
                      id={field.dataLabel}
                      placeholder={field.placeholder}
                      name={field.dataLabel}
                      value={
                        soupFormData[field.dataLabel as keyof SoupFormData] || ""
                      }
                      onChange={handleTextAreaChange}
                      rows={4}
                    ></textarea>
                  )}
                </div>
              ))}
            <div className="mb-4">
              <Allergens
                key={allergenResetKey}
                allergenFunc={handleAllergens}
                handleAllergensTextarea={handleOtherAllergens}
                otherAllergenData={soupFormData.otherAllergens}
                initialAllergens={soupFormData.allergens}
              />
            </div>
            {submitAttempted && !isFormValid() && (
              <p className="form-error" role="alert">
                Please complete Soup name, Description, Ingredients, and Garnish.
              </p>
            )}
            <div className="form-actions">
              <Button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={handleClearForm}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className={`btn btn-primary px-4 ${
                  buttonDisabled ? "disabled" : ""
                }`}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
