import { useState } from "react";
import Footer from "./components/Footer";
import SoupForm from "./components/SoupForm";

import "./App.css";
import LandingPage from "./components/LandingPage";
import { soupData } from "./data";
import type { SoupFormData } from "./components/SoupForm";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [reviewFontScale, setReviewFontScale] = useState(1);
  const [reviewCapsTitle, setReviewCapsTitle] = useState(false);
  const [reviewCapsSoupName, setReviewCapsSoupName] = useState(false);
  const [reviewCapsLabels, setReviewCapsLabels] = useState(false);
  const [reviewCapsBody, setReviewCapsBody] = useState(false);
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

  const handleClick = () => {
    setShowLandingPage(false);
  };

  const startOver = () => {
    setShowLandingPage(true);
  }

  return (
    <div className="app-shell">
      {showLandingPage ? (
        <LandingPage onClick={handleClick} />
      ) : (
        <div className="soup-form-container">
          <SoupForm
            backToLandingPage={startOver}
            soupFormData={soupFormData}
            setSoupFormData={setSoupFormData}
            reviewFontScale={reviewFontScale}
            setReviewFontScale={setReviewFontScale}
            reviewCapsTitle={reviewCapsTitle}
            setReviewCapsTitle={setReviewCapsTitle}
            reviewCapsSoupName={reviewCapsSoupName}
            setReviewCapsSoupName={setReviewCapsSoupName}
            reviewCapsLabels={reviewCapsLabels}
            setReviewCapsLabels={setReviewCapsLabels}
            reviewCapsBody={reviewCapsBody}
            setReviewCapsBody={setReviewCapsBody}
          />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
