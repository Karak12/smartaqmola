import type { Metadata } from "next";
import Link from "next/link";
import MotionCard from "@/components/MotionCard";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import Reveal from "@/components/Reveal";
import { projectStats } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Цифровые проекты — Smart Aqmola",
  description:
    "Портфель решений Smart Aqmola — от карты проблем жителей до ИИ-мониторинга и умной инфраструктуры Акмолинской области.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pb-4">
        <div className="container-content space-y-8 pb-4 pt-2">
          {/* Hero: текст + featured-проект + карусель */}
          <section>
            <ProjectsShowcase />
          </section>

          {/* Статистика */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {projectStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <MotionCard className="card h-full p-5 hover:shadow-card">
                  <div className="text-3xl font-extrabold tracking-tight text-ink">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1.5 text-[12px] font-medium text-ink-soft">
                    {s.label}
                  </div>
                </MotionCard>
              </Reveal>
            ))}
          </section>

          {/* Назад */}
          <div className="px-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary-deep"
            >
              <Icon name="arrow-right" className="h-4 w-4 rotate-180" strokeWidth={2} />
              На главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
