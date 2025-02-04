import { SoupForm } from "./SoupForm";

interface PrintDocumentProps {
  soupFormData: SoupForm;
}

export default function PrintDocument({ soupFormData }: PrintDocumentProps) {

  const allergensIngredients = soupFormData.allergens;
  return (
    <div>
      <h1>{soupFormData.title}</h1>
      <h2>{soupFormData.soupName}</h2>
      <p>Description:</p>
      <p>{soupFormData.description}</p>
      <p>Garnish:</p>
      <p>{soupFormData.garnish}</p>
      <p>Ingredients:</p>
      <p>{soupFormData.ingredients}</p>
      <p>Allergens:</p>
      {allergensIngredients &&
        allergensIngredients.map((allergenIngredient, index) => (
          <span key={index}>
            {index !== allergensIngredients.length - 1 ? (
              <span>{`${allergenIngredient}, `}</span>
            ) : (
              <span>{`${allergenIngredient}.`}</span>
            )}
          </span>
        ))}
    </div>
  );
}
