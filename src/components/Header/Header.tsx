import { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'
import { dataTestIds } from '../../helpers/dataTestIds'
import Information from '../../helpers/classes/Information';

interface HeaderProps {
  isLanguagePortuguese: boolean;
  setIsLanguagePortuguese: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setIsLanguagePortuguese, isLanguagePortuguese }: HeaderProps) => {
  const ptInformation = new Information("pt");
  const enInformation = new Information("en");

  return (
    <header
        className="mt-2 fixed top-0 right-1/2 translate-x-1/2 z-10 whitespace-nowrap p-3 hover:bg-slate-800 rounded-full"
        data-testid="header"
      >
        <Button.Root
          className="text-xs"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel}
        </Button.Root>
      </header>
  )
}