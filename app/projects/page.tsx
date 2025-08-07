import ProjectsContainer from "../components/projects-container/projects-container";
import ReactQueryProvider from "../context/ReactQueryProvider";
import styles from "../styles/pages/projects.module.scss";

export default function Projects() {
	return (
		<ReactQueryProvider>
			<div className={styles.projects}>
				<ProjectsContainer />
			</div>
		</ReactQueryProvider>
	);
}
