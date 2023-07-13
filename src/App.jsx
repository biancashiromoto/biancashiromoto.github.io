import './App.css';
import { info } from './info';
import Section from './components/Section/Section';
import LinkItems from './components/LinkItems/LinkItems';

function App() {
  const { intro } = info;

  return (
    <div>
      <Section
        props={ intro }
      >
        <div className="background-image--container" />
        <LinkItems />
      </Section>
    </div>
  )
}

export default App;