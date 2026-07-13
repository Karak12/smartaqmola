"use client";

import { useState } from "react";
import Icon from "@/shared/Icon";
import type { LS } from "@/lib/i18n";
import { fileUrl } from "@/lib/api";
import { useContent, blankProject, emptyLS, type ProjectItem } from "@/lib/admin/store";
import {
  Btn,
  ColorPicker,
  EmptyState,
  Field,
  FileUpload,
  IconBtn,
  IconPicker,
  LSInput,
  Modal,
  TextInput,
} from "../(components)/ui";

type Draft = Omit<ProjectItem, "id">;

export default function ProjectsAdmin() {
  const { projects, addProject, updateProject, deleteProject } = useContent();
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blankProject());

  const openNew = () => {
    setDraft(blankProject());
    setEditId("");
  };
  const openEdit = (item: ProjectItem) => {
    const { id, ...rest } = item;
    setDraft(rest);
    setEditId(id);
  };
  const close = () => setEditId(null);
  const save = () => {
    if (editId) updateProject(editId, draft);
    else addProject(draft);
    close();
  };
  const valid = draft.name.ru.trim() && draft.description.ru.trim();

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Проекты</h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            Карусель проектов на странице «Проекты».
          </p>
        </div>
        <Btn variant="primary" onClick={openNew}>
          <Icon name="plus-circle" className="h-4 w-4" /> Добавить
        </Btn>
      </header>

      {projects.length === 0 ? (
        <EmptyState text="Проектов пока нет." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <div key={p.id} className="card overflow-hidden">
              <div
                className="relative flex items-center justify-between overflow-hidden p-4"
                style={{ background: `linear-gradient(150deg, ${p.color}, #101B33)` }}
              >
                {fileUrl(p.coverKey) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fileUrl(p.coverKey)!}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                  />
                )}
                <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white">
                  <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="relative rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {p.status.ru}
                </span>
              </div>
              <div className="p-4">
                <div className="text-[12px] font-medium text-ink-faint">{p.tagline.ru}</div>
                <h3 className="text-[16px] font-extrabold text-ink">{p.name.ru}</h3>
                <p className="mt-1 line-clamp-2 text-[13px] text-ink-soft">{p.description.ru}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary"
                    >
                      {tag.ru}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-[12px] text-ink-faint">
                    {p.year} · {p.area.ru}
                  </span>
                  <div className="flex gap-2">
                    <IconBtn kind="edit" onClick={() => openEdit(p)} />
                    <IconBtn
                      kind="delete"
                      onClick={() => confirm("Удалить проект?") && deleteProject(p.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={editId !== null}
        title={editId ? "Редактировать проект" : "Новый проект"}
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
        <LSInput label="Название" value={draft.name} onChange={(name) => setDraft((d) => ({ ...d, name }))} />
        <LSInput
          label="Подзаголовок"
          value={draft.tagline}
          onChange={(tagline) => setDraft((d) => ({ ...d, tagline }))}
        />
        <LSInput
          label="Описание"
          value={draft.description}
          onChange={(description) => setDraft((d) => ({ ...d, description }))}
          textarea
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <LSInput
            label="Статус"
            value={draft.status}
            onChange={(status) => setDraft((d) => ({ ...d, status }))}
            placeholder={{ ru: "Работает", kk: "Жұмыс істейді" }}
          />
          <Field label="Год запуска">
            <TextInput value={draft.year} onChange={(year) => setDraft((d) => ({ ...d, year }))} placeholder="2024" />
          </Field>
        </div>
        <LSInput
          label="Охват"
          value={draft.area}
          onChange={(area) => setDraft((d) => ({ ...d, area }))}
          placeholder={{ ru: "17 районов", kk: "17 аудан" }}
        />
        <TagsEditor value={draft.tags} onChange={(tags) => setDraft((d) => ({ ...d, tags }))} />
        <FileUpload
          label="Обложка проекта"
          value={draft.coverKey}
          onChange={(coverKey) => setDraft((d) => ({ ...d, coverKey }))}
          accept="image/*"
          variant="image"
        />
        <IconPicker value={draft.icon} onChange={(icon) => setDraft((d) => ({ ...d, icon }))} />
        <ColorPicker value={draft.color} onChange={(color) => setDraft((d) => ({ ...d, color }))} />
      </Modal>
    </div>
  );
}

function TagsEditor({ value, onChange }: { value: LS[]; onChange: (v: LS[]) => void }) {
  const setAt = (i: number, tag: LS) => onChange(value.map((t, j) => (j === i ? tag : t)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const add = () => onChange([...value, { ...emptyLS }]);
  return (
    <Field label="Теги">
      <div className="space-y-2">
        {value.map((tag, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={tag.ru}
              onChange={(e) => setAt(i, { ...tag, ru: e.target.value })}
              placeholder="Тег (RU)"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-primary/50"
            />
            <input
              value={tag.kk}
              onChange={(e) => setAt(i, { ...tag, kk: e.target.value })}
              placeholder="Тег (KK)"
              className="w-full rounded-xl border border-line bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-primary/50"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-ink-faint transition-colors hover:border-rose/40 hover:text-rose"
              aria-label="Удалить тег"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="text-[13px] font-semibold text-primary hover:underline"
        >
          + Добавить тег
        </button>
      </div>
    </Field>
  );
}
