import PropTypes from "prop-types";
import './ProjectCard.css';

function ProjectCard({ props }) {
  const { id, html_url, name, homepage, description, topics, created_at } = props;

  const formattedDate = new Date(created_at).toLocaleDateString(('en-US'), {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className={ `project-card ${id}-card`}>
      <h3 className="project-name">
        <a
          href={ html_url }
          target="_blank"
          rel="noreferrer"
        >
          { name }
        </a>
      </h3>
      {homepage &&
        <a
          className="project-deploy"
          href={ homepage }
          target="_blank"
          rel="noreferrer"
        >
          Deploy
        </a>}
        {description && (
          <p className="project-description">{ description }</p>
        )}
        {`Created at: ${formattedDate}`}
        <ul className="project-tags">
          {topics && topics.map((topic, index) => (
            <li key={ index }>{ topic }</li>
          ))}
        </ul>
    </div>
  )
}

ProjectCard.propTypes = {
  description: PropTypes.string.isRequired,
  homepage: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.shape({
    created_at: PropTypes.string,
    description: PropTypes.string,
    homepage: PropTypes.string,
    html_url: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    topics: PropTypes.shape({
      map: PropTypes.func
    })
  }).isRequired,
  topics: PropTypes.shape({
    map: PropTypes.func
  }).isRequired,
  created_at: PropTypes.string,
}

export default ProjectCard
