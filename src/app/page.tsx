import { Hero } from "@/components/home/Hero";
import { ProjectRooms } from "@/components/home/ProjectRooms";
import { SiteShell } from "@/components/SiteShell";
import { getProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <SiteShell>
      <div className="pb-28">
        <Hero />
        <ProjectRooms projects={getProjects()} />
      </div>
    </SiteShell>
  );
}
