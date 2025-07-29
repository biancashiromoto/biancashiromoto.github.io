import { Repository } from "@/app/helpers/classes/fetchRepos";
import styles from "./topics-list.module.scss";

const TopicsList = ({ topics }: { topics: Repository["topics"] }) => {
	return (
		<ul className={styles["topics-list"]}>
			{topics.filter(topic => topic !== "display")
				.map(topic => (
					<li key={topic}>{topic}</li>
				))}
		</ul>
	);
};

export default TopicsList;
