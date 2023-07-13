import './App.css';
import { info } from './info';
import Section from './components/Section/Section';

function App() {
  const { intro } = info;

  return (
    <div>
      <Section
        props={ intro }
      >
        <div className="background-image--container"/>
      </Section>
    </div>
  )
}

export default App;