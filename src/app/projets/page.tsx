import type { Metadata } from "next";
import { ProjectDial } from "@/components/projects/ProjectDial";
import { SiteShell } from "@/components/SiteShell";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Marketplaces, boutiques en ligne et produits web : chaque projet répond à une question de client.",
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectDial projects={getProjects()} />
    </SiteShell>
  );
}
