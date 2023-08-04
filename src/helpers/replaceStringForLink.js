export const replaceStringForLink = (text, string, link) => {
  if (text.includes(string)) {
    text.replace(string, 
      <a href={link} target='_blank' rel="noreferrer">{string}</a>
    );
  }
  return text;
};