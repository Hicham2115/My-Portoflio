"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Lock } from "lucide-react";
import { PROJECTS, type Project, type ProjectCategory } from "@/lib/data";
import { queryKeys } from "@/lib/queryKeys";
import { WorkSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

gsap.registerPlugin(ScrollTrigger);

type Filter = "All" | ProjectCategory;
const FILTERS: Filter[] = ["All", "Full Stack", "Shopify", "Website"];

async function fetchProjects(filter: Filter): Promise<Project[]> {
  await new Promise((r) => setTimeout(r, 400));
  return filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
}

export function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const root = useRef<HTMLElement>(null);

  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.projects(activeFilter),
    queryFn: () => fetchProjects(activeFilter),
  });

  useGSAP(
    () => {
      gsap.from(".r-line > *", {
        yPercent: 110,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      gsap.from("[data-fade]", {
        autoAlpha: 0,
        y: 26,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        immediateRender: false,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!isLoading && projects.length) {
        gsap.from(".work-item", {
          autoAlpha: 0,
          y: 36,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.09,
          immediateRender: false,
        });
      }
    },
    { scope: root, dependencies: [isLoading, activeFilter] },
  );

  return (
    <section ref={root} className="sec wrap " id="work">
      <div className="sec-head">
        <div>
          <div className="eyebrow" data-fade>
            Selected Work
          </div>
          <h2 className="sec-title r-line">
            <span>Things I&apos;ve shipped</span>
          </h2>
        </div>
        <span className="sec-num" data-fade>
          ({PROJECTS.length} projects)
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-3 mb-16" data-fade>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          const count = f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              data-cursor="→"
              onClick={() => setActiveFilter(f)}
              className={[
                "cursor-none rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 border",
                isActive
                  ? "bg-[var(--lime)] text-[var(--ink)] border-[var(--lime)]"
                  : "bg-transparent text-[var(--fg2)] border-[var(--line)] hover:border-[rgba(186,252,12,0.5)] hover:text-[var(--fg)]",
              ].join(" ")}
            >
              {f}
              <span className={`ml-2 ${isActive ? "text-[var(--ink)]/70" : "text-[var(--fg3)]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects */}
      <div id="works">
        {isLoading && <WorkSkeleton />}
        {isError && (
          <ErrorState
            message="Failed to load projects."
            onRetry={() => refetch()}
          />
        )}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-[90px]">
            {projects.map((p, i) => (
              <WorkCard
                key={p.slug}
                project={p}
                index={i}
                total={projects.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const isEven = index % 2 === 1;
  const n = String(index + 1).padStart(2, "0");
  const t = String(total).padStart(2, "0");

  return (
    <article
      className={`work-item grid grid-cols-2 gap-10 items-center max-[820px]:grid-cols-1 max-[820px]:gap-[22px] ${isEven ? "[direction:rtl]" : ""}`}
    >
      <a
        href="#work"
        data-cursor="View"
        className="group relative rounded-[18px] overflow-hidden aspect-[3/2] cursor-none block [direction:ltr]"
      >
        <Image
          src={project.cover}
          alt={project.name}
          fill
          className="object-cover object-top scale-[1.18] transition-transform duration-700 ease-out group-hover:scale-[1.26]"
          sizes="(max-width: 820px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,16,19,0.75)] via-transparent to-transparent" />
        <span className="absolute left-[26px] bottom-5 z-[2] font-[family-name:var(--font-display)] font-semibold text-[20px] text-white">
          {project.name}
        </span>
        <span className="absolute top-[22px] left-6 font-[family-name:var(--font-display)] font-semibold text-[15px] text-white [mix-blend-mode:difference]">
          {n} / {t}
        </span>
        {project.protected && (
          <span className="absolute top-[18px] right-5 z-[2] flex items-center gap-1.5 text-[12px] font-semibold text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Lock size={12} aria-hidden="true" />
            Protected
          </span>
        )}
      </a>

      <div className="py-1 [direction:ltr]">
        <div className="flex items-center gap-3 mb-2 text-[13px] font-semibold text-[var(--fg3)]">
          <span>{project.category}</span>
          <span>·</span>
          <span>{project.subtitle}</span>
        </div>
        <h3
          className="r-line font-medium"
          style={{ fontSize: "clamp(1.9rem,4.4vw,3.4rem)", lineHeight: 1 }}
        >
          <span>{project.name}</span>
        </h3>
        <p className="mt-4 text-[var(--fg2)] text-[15.5px] leading-[1.55] max-w-[440px]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-[10px] my-[22px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[13px] font-semibold text-[var(--fg2)] border border-[var(--line)] rounded-full px-[15px] py-[7px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-baseline gap-3 mb-[26px]">
          <span
            className="font-[family-name:var(--font-display)] font-medium text-[var(--lime)] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.8rem,3.4vw,2.4rem)" }}
          >
            {project.statValue}
          </span>
          <span className="text-[var(--fg3)] text-[14px] font-medium">
            {project.statLabel}
          </span>
        </div>
        <span className="inline-flex items-center gap-[10px] font-[family-name:var(--font-display)] font-semibold text-[15px] text-[var(--fg)]">
          View project
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="transition-transform duration-[400ms]"
          />
        </span>
      </div>
    </article>
  );
}
