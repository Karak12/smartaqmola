// Поисковый индекс: разделы сайта, проекты и новости.
import type { IconName } from "./content";
import { navCards, news } from "./content";
import { projects } from "./projects";
import { tr, type Lang, type LS } from "./i18n";

export type SearchItem = {
  title: string;
  subtitle: string;
  href: string;
  category: LS;
  icon: IconName;
  keywords: string;
};

const catSection: LS = { ru: "Раздел", kk: "Бөлім" };
const catProject: LS = { ru: "Проект", kk: "Жоба" };
const catNews: LS = { ru: "Новость", kk: "Жаңалық" };

// Индекс зависит от языка: строим его под текущий язык интерфейса.
export function buildSearchIndex(lang: Lang): SearchItem[] {
  return [
    ...navCards.map((c): SearchItem => {
      const title = tr(c.title, lang);
      const text = tr(c.text, lang);
      return {
        title,
        subtitle: text,
        href: `/${c.slug}`,
        category: catSection,
        icon: c.icon,
        keywords: `${title} ${text}`,
      };
    }),
    ...projects.map((p): SearchItem => {
      const name = tr(p.name, lang);
      const tags = p.tags.map((t) => tr(t, lang)).join(" ");
      return {
        title: name,
        subtitle: tr(p.description, lang),
        href: "/projects",
        category: catProject,
        icon: p.icon,
        keywords: `${name} ${tr(p.tagline, lang)} ${tr(p.description, lang)} ${tags}`,
      };
    }),
    ...news.map((n): SearchItem => {
      const title = tr(n.title, lang);
      return {
        title,
        subtitle: tr(n.date, lang),
        href: "/#news",
        category: catNews,
        icon: "info",
        keywords: title,
      };
    }),
  ];
}

export function searchAll(query: string, lang: Lang, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const index = buildSearchIndex(lang);

  return index
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
