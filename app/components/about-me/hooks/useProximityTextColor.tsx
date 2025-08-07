import { useWindowResize } from "@/app/context/WindowResizeProvider";
import { useEffect, useRef } from "react";

/**
 * Hook para aplicar uma cor ao texto quando o mouse estiver a até `radius` pixels de distância de cada letra.
 * @param color Cor a ser aplicada.
 * @param radius Raio de proximidade em pixels.
 * @returns ref para ser usada no container do texto.
 */
export function useProximityTextColor(color: string = "white", radius: number = 35) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { isDesktop } = useWindowResize();

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const spans = Array.from(container.querySelectorAll("span[data-char]"));

		function handleMouseMove(e: MouseEvent) {
			spans.forEach((span) => {
				const htmlSpan = span as HTMLElement;
				const rect = htmlSpan.getBoundingClientRect();
				const dx = e.clientX - (rect.left + rect.width / 2);
				const dy = e.clientY - (rect.top + rect.height / 2);
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance <= radius) {
					htmlSpan.style.color = color;
					htmlSpan.style.fontWeight = "600";
				} else {
					htmlSpan.style.color = "";
					htmlSpan.style.fontWeight = "normal";
				}
			});
		}

		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseleave", () => {
			spans.forEach((span) => (span as HTMLElement).style.color = "");
		});

		return () => {
			container.removeEventListener("mousemove", handleMouseMove);
		};
	}, [color, radius]);

	if (!isDesktop) return;

	return containerRef;
}
