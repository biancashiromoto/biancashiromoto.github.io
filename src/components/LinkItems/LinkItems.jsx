import { Link } from "react-router-dom";
import { github_URL, linkedin_URL } from "../../helpers/info";
import './LinkItems.css';

function LinkItems() {
  return (
    <div className="links-container">
      <a
        className="linkedin-link"
        href={ linkedin_URL }
        target="_blank"
        rel="noreferrer"
      />
      <a
        className="github-link"
        href={ github_URL }
        target="_blank"
        rel="noreferrer"
      />
      <Link
        className="portfolio-link"
        to="/projects"
      />
    </div>
  )
}

export default LinkItems;
