// Поисковый индекс: разделы сайта, проекты и новости.
import type { IconName } from "./content";
import { navCards, news } from "./content";
import { projects } from "./projects";

export type SearchCategory = "Раздел" | "Проект" | "Новость";

export type SearchItem = {
  title: string;
  subtitle: string;
  href: string;
  category: SearchCategory;
  icon: IconName;
  keywords: string;
};

export const searchIndex: SearchItem[] = [
  ...navCards.map(
    (c): SearchItem => ({
      title: c.title,
      subtitle: c.text,
      href: `/${c.slug}`,
      category: "Раздел",
      icon: c.icon,
      keywords: `${c.title} ${c.text}`,
    })
  ),
  ...projects.map(
    (p): SearchItem => ({
      title: p.name,
      subtitle: p.description,
      href: "/projects",
      category: "Проект",
      icon: p.icon,
      keywords: `${p.name} ${p.tagline} ${p.description} ${p.tags.join(" ")}`,
    })
  ),
  ...news.map(
    (n): SearchItem => ({
      title: n.title,
      subtitle: n.date,
      href: "/#news",
      category: "Новость",
      icon: "info",
      keywords: n.title,
    })
  ),
];

export function searchAll(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return searchIndex
    .map((item) => {
      const hay = item.keywords.toLowerCase();
      const title = item.title.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 3;
        else if (hay.includes(t)) score += 1;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
