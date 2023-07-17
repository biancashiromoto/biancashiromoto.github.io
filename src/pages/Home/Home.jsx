import { useState } from "react";
import LinkItems from "../../components/LinkItems/LinkItems";
import Section from "../../components/Section/Section";
import { info_en, info_pt } from "../../helpers/info";
import './Home.css';

function Home() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="home--container">
     <label className="lang-toggle">
      { isChecked ? 'Translate to English 🇺🇸' : 'Traduzir para Português 🇧🇷' }
      <input
        type="checkbox"
        onChange={ () => setIsChecked((prevState) => !prevState) }
      />
     </label>
      <Section
        props={ isChecked ? info_pt.intro : info_en.intro }
      >
        <div className="background-image--container" />
        <LinkItems />
      </Section>
      <Section
        props={ isChecked ? info_pt.aboutMe : info_en.aboutMe }
      />
    </div>
  )
}

export default Home;
