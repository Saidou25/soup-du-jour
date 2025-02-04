import { ChangeEvent, useState } from "react";
import { soupData } from "../data";

import PrintDocument from "./PrintDocument";
import Label from "./Label";
import Allergens from "./Allergens";

import "./SoupForm.css";

export type SoupForm = {
  title: string;
  soupName: string;
  description: string;
  garnish: string;
  ingredients: string;
  allergens?: string[];
  otherAllergens?: string;
  dataLabel?: string;
};

export default function SoupForm() {
  const [listOfAllergens, setListOfAllergens] = useState<string[]>([]);
  const [soupForm, setSoupForm] = useState({
    title: soupData.title,
    soupName: "",
    description: "",
    garnish: "",
    ingredients: "",
    allergens: listOfAllergens,
    otherAllergens: "",
    dataLabel: "",
  });

  const { title, fields } = soupData;

  // Handles the state changes within input fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoupForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the state changes within textareas
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSoupForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the list of allergens within Allergens component
  const handleAllergens = (data: string[]) => {
    setListOfAllergens(data);
    setSoupForm((prev) => ({ ...prev, allergens: data }));
  };
  
  // Handle the other allergen not listed as checkbox within Allergens component
  const handleOtherAllergens = (data: string) => {
    setSoupForm((prev) => ({ ...prev, otherAllergens: data }));
  };

  // Submit form for print
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(soupForm);
  };

  return (
    <div>
      <h1>{title}</h1>
      <form className="soup-form" onSubmit={handleFormSubmit}>
        {fields &&
          fields.map((field) => (
            <div key={field.label}>
              <div className="label-input-divs">
                <Label label={field.label} />

                <br />
                {field.type === "text" && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.dataLabel}
                    value={soupForm[field.dataLabel as keyof SoupForm] || ""}
                    onChange={handleInputChange}
                  />
                )}
                {field.type === "textArea" && (
                  <textarea
                    placeholder={field.placeholder}
                    name={field.dataLabel}
                    value={soupForm[field.dataLabel as keyof SoupForm] || ""}
                    onChange={handleTextAreaChange}
                  ></textarea>
                )}
              </div>
              <br />
            </div>
          ))}
        <Allergens
          allergenFunc={handleAllergens}
          handleAllergensTextarea={handleOtherAllergens}
        />
        <br />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <PrintDocument soupFormData={soupForm} />
    </div>
  );
}
