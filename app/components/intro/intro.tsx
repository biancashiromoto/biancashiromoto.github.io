import { useLanguage } from "@/app/context/LanguageContext";
import styles from "./intro.module.scss";
import { altText } from "@/app/helpers/acessibility";
import Image from "next/image";
import { LinksContainer } from "../links-container";
import Information from "@/app/helpers/classes/Information";

const renderGreetingMessage = (information: Information) => {
  return (
    <div>
      {information._greetingMessage.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

const Intro = () => {
  const { information, isLanguagePortuguese } = useLanguage();

  return (
    <div className={styles.intro}>
      <Image
        alt={altText(isLanguagePortuguese).home.profilePicture}
        className={styles["profile-picture"]}
        src={information._profilePictureURL}
        width={200}
        height={200}
      />
      {renderGreetingMessage(information)}
      <LinksContainer />
    </div>
  );
};

export default Intro;
