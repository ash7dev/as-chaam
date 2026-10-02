import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CaseMessageItem } from "@/components/case-study/CaseMessageItem";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { SiteShell } from "@/components/SiteShell";
import { getCaseStudy } from "@/lib/case-study";
import { displayDomain, getNextProject, getProjectBySlug, getProjects } from "@/lib/projects";

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};
  return { title: project.nom, description: `${project.question} — ${project.resume}` };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function CaseStudyPage({ params }: PageProps<"/projets/[slug]">) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const chapters = getCaseStudy(project);
  const next = getNextProject(project.slug);
  const number = pad(getProjects().indexOf(project) + 1);

  return (
    <SiteShell>
      <article className="pb-28">
        <header className="mx-auto grid max-w-page grid-cols-1 gap-6 border-b border-line px-4 pt-4 pb-8 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-x-6 lg:px-16 lg:pt-12 lg:pb-16">
          <nav aria-label="Fil d'Ariane" className="label lg:col-span-12">
            <Link href="/projets" className="hover:text-text">
              Projets
            </Link>{" "}
            / <span className="text-text">{number} · {project.nom}</span>
          </nav>
          <div className="flex flex-col gap-4 lg:col-span-8 lg:gap-5">
            <h1 className="font-display text-[4rem] leading-[0.92] tracking-[-0.05em] lg:text-[7.5rem] lg:leading-[0.9]">{project.nom}</h1>
            <p className="font-display text-[1.375rem] font-light italic leading-tight text-muted lg:text-[2rem]">« {project.question} »</p>
            {project.chapo && <p className="max-w-2xl text-intro text-text">{project.chapo}</p>}
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm lg:col-span-4 lg:gap-y-5 lg:text-[15px]">
            {project.enBref ? (
              project.enBref.map(({ label, value, href }) => (
                <Meta key={label} term={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </Meta>
              ))
            ) : (
              <>
                <Meta term="Rôle">{project.role}</Meta>
                <Meta term="Type">{project.categorie}</Meta>
                <Meta term="Statut">
                  <StatusBadge project={project} withLink />
                </Meta>
                {project.stack.length > 0 && <Meta term="Technique">{project.stack.join(", ")}</Meta>}
              </>
            )}
          </dl>
        </header>

        <div className="mx-auto grid max-w-page grid-cols-1 gap-x-12 px-4 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)_17.5rem] lg:px-16 lg:pt-16">
          {/* Mobile : « contents » laisse le sommaire coller tout le long du fil. */}
          <div className="contents lg:sticky lg:top-8 lg:block lg:self-start">
            <ChapterNav chapters={chapters.map(({ id, titre }) => ({ id, titre }))} />
          </div>

          <div className="flex flex-col gap-4 pt-8 lg:pt-0">
            {chapters.map((chapter, index) => (
              <section key={chapter.id} id={chapter.id} aria-label={chapter.titre} className="flex scroll-mt-24 flex-col gap-4">
                <p className={`label self-center ${index > 0 ? "mt-8" : ""}`}>— {chapter.titre} —</p>
                {chapter.messages.map((message, position) => (
                  <CaseMessageItem key={position} message={message} />
                ))}
              </section>
            ))}
            {project.lien && (
              <p className="label mt-8 inline-flex items-center gap-2.5 self-center text-text">
                <span aria-hidden="true" className="size-1.5 rounded-pill bg-success" />— En ligne ·{" "}
                <a href={project.lien} target="_blank" rel="noopener noreferrer" className="link">
                  {displayDomain(project.lien)}
                </a>{" "}
                —
              </p>
            )}
          </div>

          <aside className="card mt-12 flex flex-col gap-3.5 p-6 lg:sticky lg:top-8 lg:mt-0 lg:self-start">
            <Label>Un projet comme celui-ci ?</Label>
            <p className="font-display text-2xl leading-tight tracking-[-0.01em]">Démarrez le brief, je vous montre le plan.</p>
            <ButtonLink href="/#brief" variant="accent" className="justify-between">
              Démarrer le brief
              <ArrowUpRightIcon />
            </ButtonLink>
          </aside>
        </div>

        <nav
          aria-label="Projet suivant"
          className="mx-auto mt-16 flex max-w-page flex-col-reverse gap-6 border-t border-line-strong px-4 py-8 sm:px-8 lg:mt-24 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-10"
        >
          <Link href="/projets" className="inline-flex min-h-11 items-center gap-3 text-[15px] text-muted hover:text-text">
            <ArrowLeftIcon />
            Retour au cadran
          </Link>
          <Link href={`/projets/${next.slug}`} className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-5">
            <Label>Fil suivant · {pad(getProjects().indexOf(next) + 1)}</Label>
            <span className="font-display text-[2rem] tracking-[-0.03em] lg:text-[3.5rem]">{next.nom} →</span>
          </Link>
        </nav>
      </article>
    </SiteShell>
  );
}

function Meta({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label as="dt" className="text-[10px]">
        {term}
      </Label>
      <dd>{children}</dd>
    </div>
  );
}
