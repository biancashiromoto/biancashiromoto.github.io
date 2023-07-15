import LinkItems from "../../components/LinkItems/LinkItems";
import Section from "../../components/Section/Section";
import { info } from "../../info";

function Home() {
  const { intro, aboutMe } = info;
  return (
    <div>
      <Section
        props={ intro }
      >
        <div className="background-image--container" />
        <LinkItems />
      </Section>
      <Section
        props={ aboutMe }
      />
    </div>
  )
}

export default Home
