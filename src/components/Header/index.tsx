import { Button } from '../Button'
import { dataTestIds } from '../../helpers/dataTestIds'
import Information from '../../helpers/classes/Information';
import { useCounterStore } from '../../state/store';

export const Header = () => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");

  const {
    isLanguagePortuguese,
    toggleLanguage,
  } = useCounterStore();

  return (
    <header
        data-testid="header"
      >
        <Button.Root
          className="hover:bg-slate-800 rounded-full"
          onClick={() => toggleLanguage()}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {(isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel).toUpperCase()}
        </Button.Root>
      </header>
  )
}