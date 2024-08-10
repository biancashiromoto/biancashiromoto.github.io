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
        className=""
        data-testid="header"
      >
        <Button.Root
          className="hover:bg-slate-800 rounded-full"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {(isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel).toUpperCase()}
        </Button.Root>
      </header>
  )
}