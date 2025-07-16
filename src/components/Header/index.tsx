'use client'

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

  const label = isLanguagePortuguese  ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel;

  return (
    <header data-testid="header">
        <Button.Root
          aria-label={label}
          className="header__button--translate"
          onClick={() => toggleLanguage()}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {label.toUpperCase()}
        </Button.Root>
      </header>
  )
}