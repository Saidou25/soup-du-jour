import { ChangeEvent, useEffect, useState } from "react";
import { soupData } from "../data";

import Label from "./Label";
import Allergens from "./Allergens";
import Preview from "./Preview";
import Button from "./Button";
import Header from "./header";

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
}

export default function SoupForm({ backToLandingPage }: LandingPageProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [soupFormData, setSoupFormData] = useState<SoupFormData>({
    title: soupData.title,
    soupName: "",
    description: "",
    garnish: "",
    ingredients: "",
    allergens: [],
    otherAllergens: "",
    dataLabel: "",
  });

  const { title, fields } = soupData;

  // Resetting the Form
  const handleReset = () => {
    setButtonDisabled(true);
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

  // Submit form for print
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPreview(true);
  };
  
  useEffect(() => {
    if (
      soupFormData.soupName &&
      soupFormData.garnish &&
      soupFormData.ingredients
    ) {
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
        resetForm={handleReset}
      />
    );
  }

  return (
    <div>
      <Header headerTitle="Create your Soupe du jour" />
      <form className="soup-form" onSubmit={handleFormSubmit}>
      <h1 className="title">{title}</h1>
        {fields &&
          fields.map((field) => (
            <div key={field.label}>
              <div className="label-input-divs">
                <Label label={field.label} htmlFor={field.dataLabel} />
                <br />
                {field.type === "text" && (
                  <input
                    className="text"
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
                    className="text"
                    id={field.dataLabel}
                    placeholder={field.placeholder}
                    name={field.dataLabel}
                    value={
                      soupFormData[field.dataLabel as keyof SoupFormData] || ""
                    }
                    onChange={handleTextAreaChange}
                  ></textarea>
                )}
              </div>
              <br />
              <br />
            </div>
          ))}
        <Allergens
          allergenFunc={handleAllergens}
          handleAllergensTextarea={handleOtherAllergens}
          otherAllergenData={soupFormData.otherAllergens}
          initialAllergens={soupFormData.allergens} // prop to persist allergens
        />
        <br />
        <br />
        <br />
        <Button type="submit" disabled={buttonDisabled} className="button">
          Submit
        </Button>
      </form>
    </div>
  );
}
