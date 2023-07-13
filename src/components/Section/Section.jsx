import PropTypes from "prop-types"
import './Section.css';

function Section({ props, children }) {
  const { title, content, imgSrc, imgAlt, className } = props;
  
  return (
    <section className={ `${className}-container` }>
      <img
        src={ imgSrc }
        alt={ imgAlt }
      />
      <h2>{ title }</h2>
      {content && content.map((p, index) => 
      <p key={ index }>{ p }</p>)}
      { children }
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
  props: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.shape({
      map: PropTypes.func
    }),
    imgAlt: PropTypes.string,
    imgSrc: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    map: PropTypes.func
  }),
  imgAlt: PropTypes.string,
  imgSrc: PropTypes.string,
  title: PropTypes.string
}

export default Section;
