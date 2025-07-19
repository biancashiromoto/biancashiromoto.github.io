import { FC } from "react";
import styles from "./hero.module.scss";
import Image from "next/image";
import imageUrl from "@/public/assets/image__laptop.jpg";

const Hero: FC = () => {
	return (
		<section
			className={styles.hero}
		>
			<div className={styles.imageContainer}>
				<Image
					src={imageUrl}
					alt="Laptop"
					layout="responsive"
					width={700}
					height={475}
				/>
			</div>
		</section>
	);
};

export default Hero;
