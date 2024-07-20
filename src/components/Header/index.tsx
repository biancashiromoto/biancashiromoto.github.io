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
        className="pt-2 fixed top-0 right-1/2 translate-x-1/2 z-10 whitespace-nowrap w-full"
        data-testid="header"
      >
        <Button.Root
          className="text-xs font-oswald p-3 hover:bg-slate-800 rounded-full"
          onClick={() => setIsLanguagePortuguese(prevState => !prevState)}
          testId={dataTestIds.buttons.toggleLanguageButton}
        >
          {(isLanguagePortuguese ? ptInformation._translateButtonLabel : enInformation._translateButtonLabel).toUpperCase()}
        </Button.Root>
      </header>
  )
}