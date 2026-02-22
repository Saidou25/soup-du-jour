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
      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type={type}
          id="label-title"
          onChange={handleAllergenChecbox}
          disabled={Boolean(listOfAllergens.length)}
          checked={
            listOfAllergens.length > 0 ||
            initialAllergens.length > 0 ||
            showAllergensCheckboxes
          }
        />
        <Label label={title} htmlFor="label-title" />
      </div>
      <div
        className={`container-allergens row g-2 ${
          showAllergensCheckboxes ? "allergens-open" : "allergens-closed"
        }`}
      >
        {allergens?.map((allergen) => (
          <div className="col-12 col-sm-6" key={allergen.label}>
            {allergen.type === "checkbox" &&
              allergen.label !== "Other" && (
                <div className="form-check">
                  <input
                    className="form-check-input"
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
              <div className="form-check">
                <input
                  className="form-check-input"
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
      {!!otherAllergenValue.length || showOtherAllergensTextarea ? (
        <div className="other-allergen mt-3">
          <Label
            label={otherAllergen.label}
            htmlFor={otherAllergen.dataLabel}
          />
          <textarea
            id={otherAllergen.dataLabel}
            className="form-control"
            placeholder={otherAllergenData || otherAllergen.placeholder}
            name={otherAllergen.dataLabel}
            value={otherAllergenValue || ""}
            onChange={(e) => {
              setOtherAllergenValue(e.target.value);
              handleAllergensTextarea(e.target.value);
            }}
            rows={3}
          ></textarea>
        </div>
      ) : null}
    </div>
  );
}
