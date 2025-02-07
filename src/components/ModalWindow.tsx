import Button from "./Button";

import "./ModalWindow.css";

type ModalProps = {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

const ModalWindow = ({ message, onConfirm, onClose }: ModalProps) => {
  return (
    <div className="modal-div">
      <div className="modal-confirmation">
        <h2 className="confirm-title">Final step</h2>
        <br />
        <p className="confirm-text">{message}</p>
        <br />
        <br />
        <div className="row container-buttons g-0">
          <Button
            className="col-5 button"
            onClick={onConfirm}
            type="button"
            printEdit="print-edit-container"
          >
            Yes
          </Button>
          <Button
            className="col-5 button"
            onClick={onClose}
            type="button"
            printEdit="print-edit-container"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
