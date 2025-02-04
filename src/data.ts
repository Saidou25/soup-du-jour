type FieldType = "textArea" | "text" | "checkbox"; // Add more types as needed

type Field = {
  label: string;
  dataLabel: string;
  type: FieldType;
  placeholder?: string;
};

type Soup = {
  title: string;
  fields: Field[];
};

type AllergenField = Omit<Field, "dataLabel" | "placeholder">;

type AllergensList = {
  type: FieldType;
  title: string;
  allergens: AllergenField[];
  otherAllergen: Field;
};

const allergenData: AllergensList = {
  type: "checkbox",
  title: "Allergens:",
  allergens: [
    {
      label: "Dairy",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Tree Nuts",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Fish",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Shellfish",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Wheat",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Soy",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Eggs",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
    {
      label: "Other",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
    },
  ],
  otherAllergen: {
    label: "Other allergen(s):",
    dataLabel: "other",
    type: "textArea", // "text" is valid as defined in FieldType
    placeholder: "Please list ingredient(s)",
  },
};

const soupData: Soup = {
  title: "Soup du jour",
  fields: [
    {
      label: "Soup name:",
      dataLabel: "soupName",
      type: "text", // "textArea" is valid as defined in FieldType
      placeholder: "Soup's name",
    },
    {
      label: "Description:",
      dataLabel: "description",
      type: "textArea", // "textArea" is valid as defined in FieldType
      placeholder: "Please describe the soup in a few words",
    },
    {
      label: "Garnish:",
      dataLabel: "garnish",
      type: "text", // "textArea" is valid as defined in FieldType
      placeholder: "Please list garnish ingredients",
    },
    {
      label: "Ingredients:",
      dataLabel: "ingredients",
      type: "textArea", // "text" is valid as defined in FieldType
      placeholder: "Please list ingredients",
    },
  ],
};
export { soupData, allergenData };
