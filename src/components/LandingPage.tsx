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
      <div className="landing-div">
        <span className="landing-text">Making Chefs' Lives Easier</span>
      </div>
      <div className="landing-button-div">
        <Button type="button" className="button" onClick={onClick}>
          Start
        </Button>
      </div>
    </div>
  );
}
