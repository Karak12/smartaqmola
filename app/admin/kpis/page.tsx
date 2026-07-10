"use client";

import { useState } from "react";
import Icon from "@/shared/Icon";
import { useContent, blankKpi, type KpiItem } from "@/lib/admin/store";
import {
  Btn,
  ColorPicker,
  EmptyState,
  Field,
  IconBtn,
  IconPicker,
  LSInput,
  Modal,
  TextInput,
} from "../(components)/ui";

type Draft = Omit<KpiItem, "id">;

export default function KpisAdmin() {
  const { kpis, addKpi, updateKpi, deleteKpi } = useContent();
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blankKpi());

  const openNew = () => {
    setDraft(blankKpi());
    setEditId("");
  };
  const openEdit = (item: KpiItem) => {
    const { id, ...rest } = item;
    setDraft(rest);
    setEditId(id);
  };
  const close = () => setEditId(null);
  const save = () => {
    if (editId) updateKpi(editId, draft);
    else addKpi(draft);
    close();
  };
  const valid = draft.label.ru.trim() && draft.value.ru.trim();

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Цифры</h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            Ключевые показатели в блоке «Панель региона» на главной.
          </p>
        </div>
        <Btn variant="primary" onClick={openNew}>
          <Icon name="plus-circle" className="h-4 w-4" /> Добавить
        </Btn>
      </header>

      {kpis.length === 0 ? (
        <EmptyState text="Показателей пока нет." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.id} className="card p-4">
              <div className="flex items-start justify-between">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full"
                  style={{ backgroundColor: `${k.color}1A`, color: k.color }}
                >
                  <Icon name={k.icon} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <div className="flex gap-2">
                  <IconBtn kind="edit" onClick={() => openEdit(k)} />
                  <IconBtn
                    kind="delete"
                    onClick={() => confirm("Удалить показатель?") && deleteKpi(k.id)}
                  />
                </div>
              </div>
              <div className="mt-3 text-[12px] font-medium text-ink-soft">{k.label.ru}</div>
              <div className="mt-0.5 text-2xl font-extrabold tracking-tight text-ink">
                {k.value.ru}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[11px] text-ink-faint">{k.sub.ru}</span>
                {k.delta && (
                  <span
                    className={`text-[11px] font-bold ${
                      k.deltaTone === "up" ? "text-green" : "text-rose"
                    }`}
                  >
                    {k.delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={editId !== null}
        title={editId ? "Редактировать показатель" : "Новый показатель"}
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
          label="Название"
          value={draft.label}
          onChange={(label) => setDraft((d) => ({ ...d, label }))}
        />
        <LSInput
          label="Значение"
          value={draft.value}
          onChange={(value) => setDraft((d) => ({ ...d, value }))}
          placeholder={{ ru: "24 531", kk: "24 531" }}
        />
        <LSInput
          label="Подпись"
          value={draft.sub}
          onChange={(sub) => setDraft((d) => ({ ...d, sub }))}
          placeholder={{ ru: "за 30 дней", kk: "30 күнде" }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Динамика (напр. +12%)">
            <TextInput
              value={draft.delta}
              onChange={(delta) => setDraft((d) => ({ ...d, delta }))}
              placeholder="+12%"
            />
          </Field>
          <Field label="Тон динамики">
            <div className="flex gap-2">
              {(["up", "down"] as const).map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, deltaTone: tone }))}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-[13px] font-bold transition-colors ${
                    draft.deltaTone === tone
                      ? tone === "up"
                        ? "border-green bg-green/10 text-green"
                        : "border-rose bg-rose/10 text-rose"
                      : "border-line bg-white text-ink-soft"
                  }`}
                >
                  {tone === "up" ? "▲ Рост" : "▼ Падение"}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <IconPicker value={draft.icon} onChange={(icon) => setDraft((d) => ({ ...d, icon }))} />
        <ColorPicker value={draft.color} onChange={(color) => setDraft((d) => ({ ...d, color }))} />
      </Modal>
    </div>
  );
}
