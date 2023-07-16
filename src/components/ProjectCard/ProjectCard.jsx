import PropTypes from "prop-types";
import './ProjectCard.css';

function ProjectCard({ props }) {
  const { id, html_url, name, homepage, description, topics } = props;
  return (
    <div
      className={ `project-card ${id}-card`}
    >
      <a
        href={ html_url }
        target="_blank"
        rel="noreferrer"
      >
        { name }
      </a>
      {homepage &&
        <a
          href={ homepage }
          target="_blank"
          rel="noreferrer"
        >
          Deploy
        </a>}
        {description && (
          <p>{ description }</p>
        )}
        <ul>
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
