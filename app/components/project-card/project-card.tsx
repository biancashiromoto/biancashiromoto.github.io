"use client";

import { Repository } from "@/app/helpers/classes/fetchRepos";
import Utils from "@/app/helpers/classes/Utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./project-card.module.scss";
import ProjectDescription from "./project-description/project-description";
import TopicsList from "./topics-list/topics-list";
import Placeholder from "@/public/assets/img/placeholder.webp";

const utils = new Utils();

const ProjectCard = ({ repo }: { repo: Repository }) => {
	const screenshotUrl = useMemo(() =>
		`https://raw.githubusercontent.com/biancashiromoto/${repo.name}/main/screenshots/screenshot-01.png`, [repo.name]);

	return (
		<div key={repo.id} className={styles["project-card"]}>
			<h2>{utils.formatProjectTitle(repo.name)}</h2>
			<div className={styles.content}>
				<ProjectDescription description={repo.description} />
				<TopicsList topics={repo.topics} />
				<div className={styles.links}>
					<Link href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</Link>
					<span className={styles.dot}>•</span>
					{repo.homepage && <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">View deploy</Link>}
				</div>
			</div>
			<Image
				src={screenshotUrl ?? Placeholder}
				alt={`Screenshot of ${repo.name}`}
				width={200}
				height={300}
			/>
		</div>
	);
};

export default ProjectCard;
