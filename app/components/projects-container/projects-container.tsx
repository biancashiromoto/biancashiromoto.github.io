"use client";

import ProjectCard from "@/app/components/project-card/project-card";
import { fetchRepos, Repository } from "@/app/helpers/classes/fetchRepos";
import Utils from "@/app/helpers/classes/Utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import styles from "./projects-container.module.scss";
import { useLanguage } from "@/app/context/LanguageProvider";

const utils = new Utils();
const storagedRepos = utils.getLocalStorage("repos");

const ProjectsContainer = () => {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const { isLanguagePortuguese } = useLanguage();

	const {
		data: repos,
		isLoading,
		isError,
		error
	} = useQuery<Repository[] | null, Error>({
		queryKey: ["repos"],
		queryFn: fetchRepos,
		enabled: !storagedRepos,
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
		initialData: storagedRepos ?? null,
	});

	if (isLoading) return <div>{isLanguagePortuguese ? "Carregando..." : "Loading..."}</div>;

	if (isError || !repos) {
		return <div>{isLanguagePortuguese ? "Erro ao carregar projetos" : "Error loading projects"} {error?.message ? `: ${error.message}` : ""}</div>;
	}

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

	if (!repos || repos.length === 0) {
		return <div className={styles["no-projects"]}>No projects available</div>;
	}

	return (
		<>
			<h1>{isLanguagePortuguese ? "Projetos" : "Projects"}</h1>
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
		</>
	);
};

export default ProjectsContainer;
