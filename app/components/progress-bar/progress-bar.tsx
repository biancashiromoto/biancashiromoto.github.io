"use client";

import styles from "./progress-bar.module.scss";
import useProgressBar, { UseProgressBar } from "./hooks/useProgressBar";

const ProgressBar: React.FC = () => {
  const { scrollProgress }: UseProgressBar = useProgressBar();

  const barStyle = {
    top: `${0 + 0}px`,
  } as React.CSSProperties;

  const fillStyle = {
    width: `${scrollProgress}%`,
  } as React.CSSProperties;

  return (
    <div className={styles.progressBar} style={barStyle}>
      <div className={styles.progressBarFill} style={fillStyle} />
    </div>
  );
};

export default ProgressBar;
