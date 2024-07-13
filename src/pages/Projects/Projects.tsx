import { useState } from "react";

interface ProjectsProps {
  isLanguagePortuguese: boolean;
  screenWidth: number;
}

export const Projects = ({ _isLanguagePortuguese, screenWidth }: ProjectsProps) => {
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  return (
    <div className={`mt-20 ${fadeIn ? "fade-in" : ""}`}>
      <h2 className="mb-5">In progress...</h2>
      <img 
        alt="Gif of a cat typing on a laptop"
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjRieWtkcXU0dmkzeGJhd2xueW1vOTg2N2Y5M2k0NHVoemRjMmxucSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lJNoBCvQYp7nq/giphy.webp" />
    </div>
  )
}