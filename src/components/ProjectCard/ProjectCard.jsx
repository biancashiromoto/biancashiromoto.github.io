import PropTypes from "prop-types";
import './ProjectCard.css';

function ProjectCard({ props }) {
  const { id, html_url, name, homepage, description, topics } = props;
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
        <ul className="project-tags">
          {topics && topics.map((topic, index) => (
            <li key={ index }>{ topic }</li>
          ))}
        </ul>
    </div>
  )
}

ProjectCard.propTypes = {
  props: PropTypes.shape({
    description: PropTypes.any,
    homepage: PropTypes.any,
    html_url: PropTypes.any,
    id: PropTypes.any,
    name: PropTypes.any,
    topics: PropTypes.shape({
      map: PropTypes.func
    })
  }).isRequired,
  description: PropTypes.any,
  homepage: PropTypes.any,
  html_url: PropTypes.any,
  id: PropTypes.any,
  name: PropTypes.any,
  topics: PropTypes.shape({
    map: PropTypes.func
  })
}

export default ProjectCard
