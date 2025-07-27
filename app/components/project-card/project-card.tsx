"use client";

import { Repository } from "@/app/helpers/classes/fetchRepos";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useReadMore } from "./hooks/useReadMore";
import styles from "./project-card.module.scss";
import Utils from "@/app/helpers/classes/Utils";

const utils = new Utils();

const ProjectCard = ({ repo }: { repo: Repository }) => {
	const screenshotUrl = useMemo(() =>
		`https://raw.githubusercontent.com/biancashiromoto/${repo.name}/main/screenshots/screenshot-01.png`, [repo.name]);

	const {
		displayText,
		isExpanded,
		shouldTruncate,
		toggleReadMore
	} = useReadMore(repo.description || "", 75);

	return (
		<div key={repo.id} className={styles["project-card"]}>
			<h2>{utils.formatProjectTitle(repo.name)}</h2>
			<div className={styles.content}>
				<div className={styles.description}>
					<p>{displayText}{shouldTruncate && !isExpanded && "..."}</p>
					{shouldTruncate && (
						<button
							onClick={toggleReadMore}
							className={styles.readMoreBtn}
							type="button"
						>
							{isExpanded ? "Read less" : "Read more"}
						</button>
					)}
				</div>
				{repo.topics.length > 0 && (
					<ul>
						{repo.topics.filter(topic => topic !== "display").map(topic => (
							<li key={topic}>{topic}</li>
						))}
					</ul>
				)}
				<div className={styles.links}>
					<Link href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</Link>
					<span className={styles.dot}>•</span>
					{repo.homepage && <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">Deploy</Link>}
				</div>
			</div>
			{screenshotUrl && (
				<Image
					src={screenshotUrl}
					alt={`Screenshot of ${repo.name}`}
					width={200}
					height={300}
				/>
			)}
		</div>
	);
};

export default ProjectCard;
