
function Section({ props, children }) {
  const { title, content, imgSrc, imgAlt, className } = props;
  console.log(children);
  return (
    <section className={ `${className}-container` }>
      <h2>{ title }</h2>
      {content && content.map((p, index) => 
      <p key={ index }>{ p }</p>)}
      <img
        src={ imgSrc }
        alt={ imgAlt }
      />
      { children }
    </section>
  )
}

export default Section;
