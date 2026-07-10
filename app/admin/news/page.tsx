"use client";

import { useState } from "react";
import Icon from "@/shared/Icon";
import {
  useContent,
  blankNews,
  type NewsItem,
} from "@/lib/admin/store";
import { Btn, ColorPicker, EmptyState, IconBtn, LSInput, Modal } from "../(components)/ui";

type Draft = Omit<NewsItem, "id">;

export default function NewsAdmin() {
  const { news, addNews, updateNews, deleteNews } = useContent();
  const [editId, setEditId] = useState<string | null>(null); // null=закрыто, ""=новая
  const [draft, setDraft] = useState<Draft>(blankNews());

  const openNew = () => {
    setDraft(blankNews());
    setEditId("");
  };
  const openEdit = (item: NewsItem) => {
    const { id, ...rest } = item;
    setDraft(rest);
    setEditId(id);
  };
  const close = () => setEditId(null);

  const save = () => {
    if (editId) updateNews(editId, draft);
    else addNews(draft);
    close();
  };

  const valid = draft.title.ru.trim().length > 0;

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Новости</h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            Отображаются в ленте и блоке «Новости» на главной.
          </p>
        </div>
        <Btn variant="primary" onClick={openNew}>
          <Icon name="plus-circle" className="h-4 w-4" /> Добавить
        </Btn>
      </header>

      {news.length === 0 ? (
        <EmptyState text="Новостей пока нет — добавьте первую." />
      ) : (
        <ul className="space-y-3">
          {news.map((n) => (
            <li key={n.id} className="card flex items-center gap-4 p-4">
              <span
                className="h-10 w-10 shrink-0 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${n.tone}, #12203D)` }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-ink-faint">{n.date.ru}</div>
                <div className="truncate text-[14px] font-bold text-ink">{n.title.ru}</div>
                <div className="truncate text-[12px] text-ink-faint">{n.title.kk}</div>
              </div>
              <div className="flex shrink-0 gap-2">
                <IconBtn kind="edit" onClick={() => openEdit(n)} />
                <IconBtn
                  kind="delete"
                  onClick={() => confirm("Удалить новость?") && deleteNews(n.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={editId !== null}
        title={editId ? "Редактировать новость" : "Новая новость"}
        onClose={close}
        footer={
          <>
            <Btn onClick={close}>Отмена</Btn>
            <Btn variant="primary" onClick={save} disabled={!valid}>
              Сохранить
            </Btn>
          </>
        }
      >
        <LSInput
          label="Дата"
          value={draft.date}
          onChange={(date) => setDraft((d) => ({ ...d, date }))}
          placeholder={{ ru: "20 мая 2024", kk: "2024 ж. 20 мамыр" }}
        />
        <LSInput
          label="Заголовок"
          value={draft.title}
          onChange={(title) => setDraft((d) => ({ ...d, title }))}
          textarea
        />
        <ColorPicker
          value={draft.tone}
          onChange={(tone) => setDraft((d) => ({ ...d, tone }))}
        />
      </Modal>
    </div>
  );
}
