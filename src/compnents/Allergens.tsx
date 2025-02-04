import { useEffect, useState } from "react";
import { allergenData } from "../data";

import Label from "./Label";

import "./Allergens.css";

type SoupFormProp = {
  allergenFunc: (data: string[]) => void;
  handleAllergensTextarea: (data: string) => void;
};

export default function Allergens({
  allergenFunc,
  handleAllergensTextarea,
}: SoupFormProp) {
  const [showAllergens, setShowAllergens] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [otherAllergenValue, setOtherAllergenValue] = useState("");
  const [listOfAllergens, setListOfAllergens] = useState<string[]>([]);

  const { allergens, title, type, otherAllergen } = allergenData;

  // Handle the allergen checkbox. When clicked a list of allergens shows in the ui.
  const handleAllergenChecbox = () => {
    setShowOther(false);
    setListOfAllergens([]);
    setShowAllergens((prev) => !prev);
  };

  // Handle allergen selection
  const handleAllergenFamily = (data: string) => {
    setListOfAllergens((prevList) => {
      const isPresent = prevList.includes(data);
      if (isPresent) {
        return prevList.filter((allergen) => allergen !== data);
      }
      return [...prevList, data];
    });

    if (data === "Other") {
      setShowOther((prev) => !prev);
    }
  };

  // Update parent form when allergens change
  useEffect(() => {
    allergenFunc(listOfAllergens);
  }, [listOfAllergens]);

  return (
    <div>
      <div className="check-title">
        <input type={type} onChange={handleAllergenChecbox} />
        <span>{title}</span>
      </div>
      <div className="container-allergens">
        {showAllergens &&
          allergens?.map((allergen) => (
            <div className="checkbox-container" key={allergen.label}>
              {allergen.type === "checkbox" && (
                <div className="checkbox">
                  <input
                    type="checkbox"
                    onChange={() => handleAllergenFamily(allergen.label)}
                    checked={listOfAllergens.includes(allergen.label)}
                  />
                  <span>{allergen.label}</span>
                </div>
              )}
            </div>
          ))}
      </div>
      {otherAllergen && showOther && showAllergens ? (
        <div className="other-allergen">
          <Label label={otherAllergen.label} />
          <br />
          <textarea
            className="textarea-div"
            placeholder={otherAllergen.placeholder}
            name={otherAllergen.dataLabel}
            value={otherAllergenValue}
            onChange={(e) => {
              setOtherAllergenValue(e.target.value);
              handleAllergensTextarea(e.target.value);
            }}
          ></textarea>
        </div>
      ) : null}
    </div>
  );
}
