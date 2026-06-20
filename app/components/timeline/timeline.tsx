import { information as getInformation } from "../../helpers/information";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { getAriaLabel } from "../../helpers/accessibility";
import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./timeline.module.scss";

const Timeline = () => {
  const { isLanguagePortuguese } = useLanguage();

  const {
    home: { timeline },
  } = getInformation(isLanguagePortuguese);
  const ariaLabel = getAriaLabel(isLanguagePortuguese);

  return (
    <section
      className={styles.timeline}
      role="region"
      id="timeline"
      aria-label={ariaLabel.timeline.description}
    >
      <ol className={`${styles.list}`}>
        {timeline.reverse().map((item, index) => (
          <li
            key={index}
            className={`${styles.item} ${index % 2 === 0 ? styles["item--right"] : styles["item--left"]}`}
          >
            <div
              className={`${styles.icon} ${isLanguagePortuguese ? styles.portuguese : styles.english}`}
              aria-hidden="true"
            >
              {item.type === "work" ? <FaBriefcase /> : <FaGraduationCap />}
            </div>
            <div tabIndex={0} className={styles.content}>
              <h3>{item.position}</h3>
              <h4>{item.location}</h4>
              <span
                className={`${styles.date} ${isLanguagePortuguese ? styles.portuguese : styles.english}`}
              >
                {item.date}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Timeline;
