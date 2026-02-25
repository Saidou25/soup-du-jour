import "./LandingPage.css";
// import soupImage from "../assets/soup4.jpeg";
import Button from "./Button";
import Logo from "./Logo";

type LandingPageProps = {
  onClick: () => void;
};
export default function LandingPage({ onClick }: LandingPageProps) {
  return (
    <div className="landing-container">
      <Logo />
      <div className="landing-ornament" />
      <div className="landing-card elevated-card">
        <p className="landing-text">Making Chefs' Lives Easier</p>
      </div>
      <div className="landing-button-div">
        <Button
          type="button"
          className="btn btn-primary px-5 start-button"
          onClick={onClick}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
