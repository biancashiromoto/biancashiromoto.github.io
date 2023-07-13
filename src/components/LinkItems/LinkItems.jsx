import { github_URL, linkedin_URL } from "../../info";

function LinkItems() {
  return (
    <div className="links--container">
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
    </div>
  )
}

export default LinkItems;
