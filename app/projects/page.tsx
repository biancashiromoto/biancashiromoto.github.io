import ProjectsContainer from "../components/projects-container/projects-container";
import styles from "../styles/pages/projects.module.scss";

export default function Projects() {
	return (
		<div className={styles.projects}>
			<h1>Projects</h1>
			<ProjectsContainer />
		</div>
	);
}
