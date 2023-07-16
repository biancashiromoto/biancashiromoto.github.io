import { Link } from "react-router-dom";
import './ReturnButton.css';

function ReturnButton() {
  return (
    <Link
      to="/"
      className="return-button"
    />
  )
}

export default ReturnButton
