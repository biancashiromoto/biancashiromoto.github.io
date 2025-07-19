import { useEffect, useRef } from "react";

export const useHeroScrollEffect = () => {
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!imageRef.current) return;

			const currentScrollY = window.scrollY;

			// Calcula o efeito baseado no scroll
			const maxScroll = 400; // Pixels de scroll para completar o efeito
			const scrollProgress = Math.min(currentScrollY / maxScroll, 1);

			// Efeito de "fechamento" - reduz a escala e faz a imagem desaparecer completamente
			const newScale = 1 - (scrollProgress * 0.5); // Reduz até 50% do tamanho original
			const newOpacity = 1 - scrollProgress; // Desaparece completamente (0% de opacidade)

			const finalScale = Math.max(newScale, 0.5); // Mínimo de 50%
			const finalOpacity = Math.max(newOpacity, 0); // Mínimo de 0% (completamente invisível)

			// Aplica as transformações diretamente ao elemento
			imageRef.current.style.setProperty("--image-scale", finalScale.toString());
			imageRef.current.style.setProperty("--image-opacity", finalOpacity.toString());
		};

		window.addEventListener("scroll", handleScroll);

		// Chama uma vez para definir o estado inicial
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return {
		imageRef,
	};
};
