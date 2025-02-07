import { FaLinkedinIn } from "react-icons/fa";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="container-footer no-print">
      <div className="footer-text-div">
        <p className="footer-text">Chefs' Life Made Easy was built by Saidou Monta</p>
        <p className="footer-text">
          For questions, comments, concerns, or to report a bug, please contact:
        </p>
        <p className="footer-text">mosaidou@gmail.com</p>
        <a
          className="container-logo g-0"
          href="https://www.linkedin.com/in/saidou-monta?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}
