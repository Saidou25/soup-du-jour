import { useState } from "react";
import { soupData } from "../data";

import "./SoupForm.css";

export default function SoupForm() {
  const [showAllergens, setShowAllergens] = useState(false);
  const [listOfAllergens, setListOfAllergens] = useState<string[]>([]);

  const { title, fields } = soupData;

  const handleAllergenChecbox = () => {
    setShowAllergens((prev) => !prev);
  };
  console.log(listOfAllergens);

  const handleAllergenFamily = (data: string) => {
    setListOfAllergens((prevList) => {
      if (prevList.includes(data)) {
        return prevList.filter((allergen) => allergen !== data); // Remove if already selected
      } else {
        return [...prevList, data]; // Add to the list
      }
    });
  };

  return (
    <div>
      <h1>{title}</h1>
      <form className="soup-form">
        {fields &&
          fields.map((field) => (
            <div key={field.label}>
              <>
                <label>
                  <span>{field.label}</span>
                </label>
                <br />
                {field.type === "text" && (
                  <input type={field.type} placeholder={field.placeholder} />
                )}
                {field.type === "textArea" &&
                  field.label !== "Dairy: " &&
                  field.label !== "Nuts: " && (
                    <textarea placeholder={field.placeholder}></textarea>
                  )}
                {field.type === "checkbox" && field.label === "Allergens:" && (
                  <>
                    <input
                      type={field.type}
                      checked={showAllergens}
                      onChange={handleAllergenChecbox} // Pass the label name to the handler
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
              </>
              <br />
            </div>
          ))}
      </form>
    </div>
  );
}
