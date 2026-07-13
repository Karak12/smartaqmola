"use client";

import { useState } from "react";
import Icon from "@/shared/Icon";
import type { LS } from "@/lib/i18n";
import { procurementGroupsMeta } from "@/lib/procurement";
import {
  useContent,
  blankProcurement,
  emptyLS,
  type ProcurementItem,
} from "@/lib/admin/store";
import { Btn, EmptyState, Field, FileUpload, IconBtn, LSInput, Modal } from "../(components)/ui";

type Draft = Omit<ProcurementItem, "id">;

const isEmptyLS = (v?: LS | null) => !v || (!v.ru.trim() && !v.kk.trim());

export default function ProcurementAdmin() {
  const { procurement, addProcurement, updateProcurement, deleteProcurement } =
    useContent();
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blankProcurement());

  const openNew = () => {
    setDraft(blankProcurement());
    setEditId("");
  };
  const openEdit = (item: ProcurementItem) => {
    const { id, ...rest } = item;
    setDraft({
      ...rest,
      meta: rest.meta ?? { ...emptyLS },
      badge: rest.badge ?? { ...emptyLS },
    });
    setEditId(id);
  };
  const close = () => setEditId(null);

  const save = () => {
    const payload: Draft = {
      groupKey: draft.groupKey,
      label: draft.label,
      meta: isEmptyLS(draft.meta) ? null : draft.meta,
      badge: isEmptyLS(draft.badge) ? null : draft.badge,
      fileKey: draft.fileKey ?? null,
    };
    if (editId) updateProcurement(editId, payload);
    else addProcurement(payload);
    close();
  };

  const valid = draft.label.ru.trim().length > 0;
  const groupTitle = (key: string) =>
    procurementGroupsMeta.find((g) => g.key === key)?.title.ru ?? key;

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">Закупки</h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            Планы госзакупок и объявления о конкурсах на странице «Закупки».
          </p>
        </div>
        <Btn variant="primary" onClick={openNew}>
          <Icon name="plus-circle" className="h-4 w-4" /> Добавить
        </Btn>
      </header>

      {procurement.length === 0 ? (
        <EmptyState text="Документов пока нет." />
      ) : (
        procurementGroupsMeta.map((meta) => {
          const items = procurement.filter((d) => d.groupKey === meta.key);
          if (items.length === 0) return null;
          return (
            <section key={meta.key} className="card p-5">
              <h2 className="mb-3 flex items-center gap-2 text-[14px] font-extrabold text-ink">
                <Icon name={meta.icon} className="h-4 w-4 text-primary" />
                {meta.title.ru}
              </h2>
              <ul className="divide-y divide-line">
                {items.map((d) => (
                  <li key={d.id} className="flex items-center gap-3 py-2.5">
                    <Icon name="doc" className="h-4 w-4 shrink-0 text-ink-faint" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-semibold text-ink">
                        {d.label.ru}
                      </div>
                      {d.meta && (
                        <div className="truncate text-[12px] text-ink-faint">{d.meta.ru}</div>
                      )}
                    </div>
                    {d.badge && (
                      <span className="shrink-0 rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary">
                        {d.badge.ru}
                      </span>
                    )}
                    {d.fileKey && (
                      <span className="shrink-0 rounded bg-rose/10 px-1.5 py-0.5 text-[10px] font-bold text-rose">
                        PDF
                      </span>
                    )}
                    <div className="flex shrink-0 gap-2">
                      <IconBtn kind="edit" onClick={() => openEdit(d)} />
                      <IconBtn
                        kind="delete"
                        onClick={() => confirm("Удалить документ?") && deleteProcurement(d.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}

      <Modal
        open={editId !== null}
        title={editId ? "Редактировать документ" : "Новый документ"}
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
        <Field label="Раздел">
          <div className="flex flex-wrap gap-2">
            {procurementGroupsMeta.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setDraft((d) => ({ ...d, groupKey: g.key }))}
                className={`rounded-xl border px-3 py-2 text-[13px] font-semibold transition-colors ${
                  draft.groupKey === g.key
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-line bg-white text-ink-soft"
                }`}
              >
                {groupTitle(g.key)}
              </button>
            ))}
          </div>
        </Field>
        <LSInput
          label="Название документа"
          value={draft.label}
          onChange={(label) => setDraft((d) => ({ ...d, label }))}
          textarea
        />
        <LSInput
          label="Подпись / срок (необязательно)"
          value={draft.meta ?? { ...emptyLS }}
          onChange={(meta) => setDraft((d) => ({ ...d, meta }))}
          placeholder={{ ru: "Приём заявок до 15 июля 2025", kk: "..." }}
        />
        <LSInput
          label="Бейдж (необязательно)"
          value={draft.badge ?? { ...emptyLS }}
          onChange={(badge) => setDraft((d) => ({ ...d, badge }))}
          placeholder={{ ru: "Активен", kk: "Белсенді" }}
        />
        <FileUpload
          label="Файл документа (PDF)"
          value={draft.fileKey}
          onChange={(fileKey) => setDraft((d) => ({ ...d, fileKey }))}
          accept="application/pdf"
          variant="file"
        />
      </Modal>
    </div>
  );
}
