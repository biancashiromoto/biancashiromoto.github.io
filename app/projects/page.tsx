"use client";

import { features } from "@/app/config/features";
import ProjectsContainer from "../components/projects-container/projects-container";
import ReactQueryProvider from "../context/ReactQueryProvider";
import styles from "../styles/pages/projects.module.scss";
import NotFound from "../not-found";

export default function Projects() {
  if (!features.projects) return <NotFound />;

  return (
    <ReactQueryProvider>
      <div className={styles.projects}>
        <ProjectsContainer />
      </div>
    </ReactQueryProvider>
  );
}
