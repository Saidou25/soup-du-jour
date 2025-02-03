import { ChangeEvent, useEffect, useState } from "react";
import { soupData } from "../data";

import PrintDocument from "./PrintDocument";

import "./SoupForm.css";

export type SoupForm = {
  title: string;
  soupName: string;
  description: string;
  ingredients: string;
  allergens?: string[];
  otherAllergens?: string;
};

export default function SoupForm() {
  const [showAllergens, setShowAllergens] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [listOfAllergens, setListOfAllergens] = useState<string[]>([]);
  const [soupForm, setSoupForm] = useState({
    title: soupData.title,
    soupName: "",
    description: "",
    ingredients: "",
    allergens: listOfAllergens,
    otherAllergens: "",
  });

  const { title, fields } = soupData;

  // Handle the allergen checkbox. When clicked a list of allergens shows in the ui.
  const handleAllergenChecbox = () => {
    setShowOther(false);
    setShowAllergens((prev) => !prev);
  };
  // console.log(listOfAllergens);
  // Handle checkbox for each allergen. When clicked the selected allergen is placed in the allergens array. If already present in the array then it is removed and marked as unchecked.
  const handleAllergenFamily = (data: string) => {
    setListOfAllergens((prevList) => {
      // Treating the "Other" checkbox showing or not independently from other ones.
      if (data === "Other") {
        if (prevList.includes(data)) {
          setShowOther(false);
          return prevList.filter((allergen) => allergen !== data); // Remove if already selected
        } else {
          setShowOther(true);
          return [...prevList, data]; // Add to the list
        }
      } else {
        if (prevList.includes(data)) {
          return prevList.filter((allergen) => allergen !== data); // Remove if already selected
        } else {
          return [...prevList, data]; // Add to the list
        }
      }
    });
  };

  // Handles the state changes within input fields
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoupForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the state changes within textareas
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // console.log("name: ", name, "value: ", value);
    setSoupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(soupForm);
  };

  // setting up the list of allergens in the soupForm when ever the list of allergen changes
  useEffect(() => {
      setSoupForm((prev) => ({ ...prev, allergens: listOfAllergens }));
  }, [listOfAllergens]);

  // console.log(soupForm);
  return (
    <div>
      <h1>{title}</h1>
      <form className="soup-form" onSubmit={handleFormSubmit}>
        {fields &&
          fields.map((field) => (
            <div key={field.label}>
              <>
                {field.label !== "Other allergen(s):" && (
                  <label>
                    <span>{field.label}</span>
                  </label>
                )}

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
                {field.type === "textArea" &&
                  field.label !== "Other allergen(s):" && (
                    <textarea
                      placeholder={field.placeholder}
                      name={field.dataLabel}
                      value={soupForm[field.dataLabel as keyof SoupForm] || ""}
                      onChange={handleTextAreaChange}
                    ></textarea>
                  )}
                {field.type === "checkbox" && field.label === "Allergens:" && (
                  <>
                    <input
                      type={field.type}
                      checked={showAllergens}
                      onChange={handleAllergenChecbox}
                    />
                  </>
                )}

                {showAllergens &&
                  field.allergens?.map((allergen) => (
                    <div key={allergen.label}>
                      {allergen.type === "checkbox" && (
                        <>
                          <input
                            type={allergen.type}
                            onChange={() =>
                              handleAllergenFamily(allergen.label)
                            }
                          />
                          <span>{allergen.label}</span>
                        </>
                      )}
                    </div>
                  ))}

                {field.label === "Other allergen(s):" &&
                showOther &&
                showAllergens ? (
                  <>
                    <span>{field.label}</span>
                    <textarea
                      placeholder={field.placeholder}
                      name={field.dataLabel}
                      value={soupForm[field.dataLabel as keyof SoupForm] || ""}
                      onChange={handleTextAreaChange}
                    ></textarea>
                  </>
                ) : null}
              </>
              <br />
            </div>
          ))}
        <button type="submit">Submit</button>
      </form>
      <PrintDocument soupFormData={soupForm} />
    </div>
  );
}
