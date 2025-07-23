import { FC } from "react";
import styles from "./hero.module.scss";
import Image from "next/image";
import imageUrl from "@/public/assets/image__laptop.jpg";
import { useHeroScrollEffect } from "./hooks/useHeroScrollEffect";

const Hero: FC = () => {
	const { imageRef } = useHeroScrollEffect();

	return (
		<section
			className={styles.hero}
		>
			<div
				ref={imageRef}
				className={styles.imageContainer}
			>
				<Image
					src={imageUrl}
					alt="Laptop"
					width={300}
					height={undefined}
					priority
					placeholder="blur"
				/>
			</div>
		</section>
	);
};

export default Hero;
