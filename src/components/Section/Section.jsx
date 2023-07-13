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

export default Section;
