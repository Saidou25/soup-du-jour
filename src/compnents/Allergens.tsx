import { useEffect, useState } from "react";
import { allergenData } from "../data";

import Label from "./Label";

import "./Allergens.css";

type SoupFormProp = {
  allergenFunc: (data: string[]) => void;
  handleAllergensTextarea: (data: string) => void;
  otherAllergenData?: string;
  initialAllergens?: string[];
};

export default function Allergens({
  allergenFunc,
  handleAllergensTextarea,
  otherAllergenData,
  initialAllergens = [],
}: SoupFormProp) {
  const [listOfAllergens, setListOfAllergens] =
    useState<string[]>(initialAllergens);
  const [showAllergensCheckboxes, setShowAllergensCheckboxes] = useState(
    initialAllergens.length || listOfAllergens.length ? true : false
  );
  const [otherAllergenValue, setOtherAllergenValue] = useState(
    otherAllergenData || ""
  );
  const [showOtherAllergensTextarea, setShowOtherAllergensTextarea] = useState(
    listOfAllergens.includes("Other") || initialAllergens.includes("Other")
      ? true
      : false
  );

  const { allergens, title, type, otherAllergen } = allergenData;

  // Handle the allergen checkbox. When clicked a list of allergens shows in the ui.
  const handleAllergenChecbox = () => {
    const newState = showAllergensCheckboxes ? false : true;
    setShowAllergensCheckboxes(newState);
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
      const newState = showOtherAllergensTextarea ? false : true;
      setShowOtherAllergensTextarea(newState);
    }
  };

  // Update parent form when allergens change
  useEffect(() => {
    allergenFunc(listOfAllergens);
  }, [listOfAllergens]);

  useEffect(() => {
    if (
      listOfAllergens.length > 0 ||
      initialAllergens.length > 0 ||
      showAllergensCheckboxes
    ) {
      setShowAllergensCheckboxes(true);
    } else {
      setShowAllergensCheckboxes(false);
    }
  }, [listOfAllergens, initialAllergens, showAllergensCheckboxes]);

  return (
    <div>
      <div className="check-title">
        <input
          type={type}
          id="label-title"
          onChange={handleAllergenChecbox}
          disabled={Boolean(listOfAllergens.length)} // Disable if otherAllergenValue is truthy
          checked={
            listOfAllergens.length > 0 ||
            initialAllergens.length > 0 ||
            showAllergensCheckboxes
          }
        />
        <Label label={title} htmlFor="label-title" />
      </div>
      <br />
      <div className="container-allergens">
        {showAllergensCheckboxes &&
          allergens?.map((allergen) => (
            <div className="checkbox-container" key={allergen.label}>
              {allergen.type === "checkbox" &&
                allergen.label !== "Other" &&
                showAllergensCheckboxes && (
                  <div className="checkbox">
                    <input
                      className="checkbox-check"
                      id={allergen.label}
                      type="checkbox"
                      onChange={() => handleAllergenFamily(allergen.label)}
                      checked={listOfAllergens.includes(allergen.label)}
                      name={allergen.label}
                    />
                    <Label label={allergen.label} htmlFor={allergen.label} />
                  </div>
                )}
              {allergen.type === "checkbox" && allergen.label === "Other" && (
                <div className="checkbox">
                  <input
                    className="checkbox-check"
                    id={allergen.label}
                    type="checkbox"
                    onChange={() => handleAllergenFamily(allergen.label)}
                    checked={
                      listOfAllergens.includes(allergen.label) ||
                      Boolean(otherAllergenValue)
                    }
                    name={allergen.label}
                    disabled={Boolean(otherAllergenValue)} // Disable if otherAllergenValue is truthy
                  />
                  <Label label={allergen.label} htmlFor={allergen.label} />
                </div>
              )}
            </div>
          ))}
      </div>
      <br />
      {!!otherAllergenValue.length || showOtherAllergensTextarea ? (
        <div className="other-allergen">
          <Label
            label={otherAllergen.label}
            htmlFor={otherAllergen.dataLabel}
          />
          <br />
          <textarea
            id={otherAllergen.dataLabel}
            className="text"
            placeholder={otherAllergenData || otherAllergen.placeholder}
            name={otherAllergen.dataLabel}
            value={otherAllergenValue || ""}
            onChange={(e) => {
              setOtherAllergenValue(e.target.value);
              handleAllergensTextarea(e.target.value);
            }}
          ></textarea>
          <br />
        </div>
      ) : null}
    </div>
  );
}
