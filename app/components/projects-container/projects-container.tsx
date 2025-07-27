"use client";

import ProjectCard from "@/app/components/project-card/project-card";
import { fetchRepos, Repository } from "@/app/helpers/classes/fetchRepos";
import {
	useEffect,
	useState,
	useRef
} from "react";
import styles from "./projects-container.module.scss";
import Utils from "@/app/helpers/classes/Utils";

const utils = new Utils();
const storagedRepos = utils.getLocalStorage("repos");

const ProjectsContainer = () => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const isScrollingRef = useRef(false);

	const scrollToCard = (index: number) => {
		if (!containerRef.current) return;

		const cardWidth = containerRef.current.clientWidth;
		containerRef.current.scrollTo({
			left: index * cardWidth,
			behavior: "smooth"
		});
	};

	const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (isScrollingRef.current) return;

		isScrollingRef.current = true;

		const delta = event.deltaY;
		let newIndex = currentCardIndex;

		if (delta > 0 && currentCardIndex < repos.length - 1) {
			// Scroll para baixo - próximo card
			newIndex = currentCardIndex + 1;
		} else if (delta < 0 && currentCardIndex > 0) {
			// Scroll para cima - card anterior
			newIndex = currentCardIndex - 1;
		} else if (delta > 0 && currentCardIndex === repos.length - 1) {
			// Se estiver no último card e scrollar para baixo, volta para o primeiro
			newIndex = 0;
		}

		if (newIndex !== currentCardIndex) {
			setCurrentCardIndex(newIndex);
			scrollToCard(newIndex);
		}

		// Debounce para evitar múltiplos scrolls
		setTimeout(() => {
			isScrollingRef.current = false;
		}, 500);
	};

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		// Detecta mudança de card baseada na posição do scroll
		if (!isScrollingRef.current && containerRef.current) {
			const scrollLeft = event.currentTarget.scrollLeft;
			const cardWidth = containerRef.current.clientWidth;
			const newIndex = Math.round(scrollLeft / cardWidth);

			if (newIndex !== currentCardIndex && newIndex >= 0 && newIndex < repos.length) {
				setCurrentCardIndex(newIndex);
			}
		}
	};

	useEffect(() => {
		if (!storagedRepos) {
			const fetchData = async () => {
				const data = await fetchRepos();
				setRepos(data);
			};
			fetchData();
		}
		else {
			setRepos(storagedRepos);
		}
	}, []);

	useEffect(() => {
		utils.setLocalStorage("repos", repos);
	}, [repos]);

	return (
		<div
			className={styles["projects-container"]}
			onScroll={handleScroll}
			onWheel={handleWheel}
			ref={containerRef}
		>
			{repos.map(repo => (
				<ProjectCard key={repo.id} repo={repo} />
			))}
		</div>
	);
};

export default ProjectsContainer;
