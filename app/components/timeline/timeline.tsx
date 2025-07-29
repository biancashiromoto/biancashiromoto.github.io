import { VerticalTimeline, VerticalTimelineElement }  from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { information as getInformation } from "../../helpers/information";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { getAriaLabel as getAriaLabel } from "../../helpers/acessibility";
import { useLanguage } from "@/app/context/LanguageProvider";
import styles from "./timeline.module.scss";

const Timeline = () => {
	const { isLanguagePortuguese } = useLanguage();

	const { home: { timeline } } = getInformation(isLanguagePortuguese);
	const ariaLabel = getAriaLabel(isLanguagePortuguese);

	return (
		<div className={styles.timeline} role="region" id="timeline">
			<VerticalTimeline
				layout="2-columns"
				className={styles.container}
				aria-label={ariaLabel.timeline.description}
			>
				{timeline.reverse().map((item, index) => (
					<VerticalTimelineElement
						className={styles.item}
						contentStyle={{ background: "unset" }}
						date={item.date}
						dateClassName={index + 1 % 2 === 0 ? styles["left-content"] : styles["right-content"]}
						key={index}
						icon={
							item.type === "work" ? (
								<FaBriefcase />
							) : (
								<FaGraduationCap />
							)
						}
					>
						<div tabIndex={0} className={index % 2 !== 0 ? styles["left-content"] : styles["right-content"]}>
							<h3>
								{item.position}
							</h3>
							<h4>
								{item.location}
							</h4>
						</div>
					</VerticalTimelineElement>
				))}
			</VerticalTimeline>
		</div>
	);
};

export default Timeline;
