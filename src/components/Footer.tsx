import { FaLinkedinIn } from "react-icons/fa";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="container-footer no-print">
      <div className="container text-center py-4">
        <p className="footer-text">Buildt by </p>
        <a
          className="footer-link"
          href="https://vergetechinnovationslab.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          VergeTech Innovations Lab
        </a>
        , llc
        <p className="footer-text">
          {/* <a className="footer-link" href="mailto:vergetechinnovationslab.com">
            Contact
          </a> */}
        </p>
        <a
          className="container-logo"
          href="https://www.linkedin.com/in/saidou-monta?trk=profile-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}
