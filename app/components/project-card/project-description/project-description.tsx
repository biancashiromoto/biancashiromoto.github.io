import { useReadMore } from "../hooks/useReadMore";
import { Repository } from "@/app/helpers/classes/fetchRepos";
import styles from "./project-description.module.scss";

const ProjectDescription = ({ description }: { description?: Repository["description"] }) => {
  if (!description) return null;

  const { displayText, isExpanded, shouldTruncate, toggleReadMore } = useReadMore(description, 75);
  return (
    <div className={styles.description}>
      <p>
        {displayText}
        {shouldTruncate && !isExpanded && "..."}
      </p>
      {shouldTruncate && (
        <button onClick={toggleReadMore} className={styles["read-more"]} type="button">
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default ProjectDescription;
