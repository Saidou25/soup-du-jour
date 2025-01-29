type FieldType = "textArea" | "text" | "checkbox"; // Add more types as needed

type Field = {
  label: string;
  type: FieldType;
  input: string;
  placeholder?: string;
  allergens?: Field[];
};

type Soup = {
  title: string;
  fields: Field[];
};

// Now `soupData` is an object instead of an array
const soupData: Soup = {
  title: "Soup du jour",
  fields: [
    {
      label: "Soup name:",
      type: "text", // "textArea" is valid as defined in FieldType
      input: "",
      placeholder: "Please describe the soup in a few words",
    },
    {
      label: "Description:",
      type: "textArea", // "textArea" is valid as defined in FieldType
      input: "",
      placeholder: "Please describe the soup in a few words",
    },
    {
      label: "Ingredients:",
      type: "textArea", // "text" is valid as defined in FieldType
      input: "",
      placeholder: "Please list ingredients",
    },
    {
      label: "Allergens:",
      type: "checkbox", // "checkbox" is valid as defined in FieldType
      input: "",
      placeholder: "Add the list of allergens",
      allergens: [
        {
          label: "Dairy",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
        {
          label: "Tree Nuts",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
        {
          label: "Fish",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
        {
          label: "Shellfish",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
        {
          label: "Wheat",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
        {
          label: "Soy",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
        {
          label: "Eggs",
          type: "checkbox", // "checkbox" is valid as defined in FieldType
          input: "",
        },
      ],
    },
  ],
};
export { soupData };
