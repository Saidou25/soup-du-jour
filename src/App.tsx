import { useState } from "react";
import Footer from "./components/Footer";
import SoupForm from "./components/SoupForm";

import "./App.css";
import LandingPage from "./components/LandingPage";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleClick = () => {
    setShowLandingPage(false);
  };

  const startOver = () => {
    setShowLandingPage(true);
  }

  return (
    <div>
      {showLandingPage ? (
        <LandingPage onClick={handleClick} />
      ) : (
        <div className="soup-form-container">
          <SoupForm backToLandingPage={startOver} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
