import { Button } from '../Button'
import { dataTestIds } from '../../helpers/dataTestIds'
import { useCounterStore } from '../../state/store';

export const Header = () => {
  const {
    isLanguagePortuguese,
    toggleLanguage,
    enInformation,
    ptInformation
  } = useCounterStore();

  return (
    <header data-testid="header">
        <Button.Root
          aria-label={
            isLanguagePortuguese 
              ? ptInformation._translateButtonLabel
              : enInformation._translateButtonLabel
          }
          className="translate"
          onClick={() => toggleLanguage()}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {(isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel).toUpperCase()}
        </Button.Root>
      </header>
  )
}