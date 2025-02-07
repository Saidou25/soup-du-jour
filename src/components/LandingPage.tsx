import "./LandingPage.css";
// import soupImage from "../assets/soup4.jpeg";
import Button from "./Button";

type LandingPageProps = {
  onClick: () => void;
};
export default function LandingPage({ onClick }: LandingPageProps) {
  return (
    <div className="landing-container">
      <div className="landing-div">
        <h3 className="landing-text">Making Chefs' Lives Easier</h3>
      </div>
      <div className="landing-button-div">
        <Button type="button" className="button" onClick={onClick}>
          Start
        </Button>
      </div>
    </div>
  );
}
