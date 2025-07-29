"use client";

import ProjectCard from "@/app/components/project-card/project-card";
import { fetchRepos, Repository } from "@/app/helpers/classes/fetchRepos";
import { useEffect, useState } from "react";
import styles from "./projects-container.module.scss";
import Utils from "@/app/helpers/classes/Utils";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const utils = new Utils();

const ProjectsContainer = () => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const goToNext = () => {
		setCurrentCardIndex((prev) => (repos.length === 0 ? 0 : (prev + 1) % repos.length));
	};

	const goToPrevious = () => {
		setCurrentCardIndex((prev) => (repos.length === 0 ? 0 : (prev - 1 + repos.length) % repos.length));
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ArrowRight") goToNext();
		if (event.key === "ArrowLeft") goToPrevious();
	};

	useEffect(() => {
		const storagedRepos = utils.getLocalStorage("repos");
		if (!storagedRepos) {
			const fetchData = async () => {
				const data = await fetchRepos();
				setRepos(data);
			};
			fetchData();
		} else {
			setRepos(storagedRepos);
		}
	}, []);

	useEffect(() => {
		if (repos.length > 0) {
			utils.setLocalStorage("repos", repos);
		}
	}, [repos]);

	return (
		<div
			className={styles["projects-container"]}
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<button
				type="button"
				className={styles["scroll-previous"]}
				onClick={goToPrevious}
				aria-label="Projeto anterior"
			>
				<BsArrowLeft />
			</button>
			{repos.length > 0 && (
				<ProjectCard repo={repos[currentCardIndex]} />
			)}
			<button
				type="button"
				className={styles["scroll-next"]}
				onClick={goToNext}
				aria-label="Próximo projeto"
			>
				<BsArrowRight />
			</button>
		</div>
	);
};

export default ProjectsContainer;
