"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type IconBtnProps = {
  onClick: () => void;
  "aria-label": string;
  className?: string;
};

type ActionMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
};

export function TableEditIconButton({ onClick, "aria-label": ariaLabel, className }: IconBtnProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={onClick}
      className={`size-6 shrink-0 rounded-[5px] border-[0.5px] border-primary/50 bg-transparent p-0 text-primary hover:border-primary hover:bg-transparent ${className ?? ""}`}
      aria-label={ariaLabel}
    >
      <Pencil className="size-4" aria-hidden />
    </Button>
  );
}

export function TableDeleteIconButton({ onClick, "aria-label": ariaLabel, className }: IconBtnProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => setConfirmOpen(true)}
        className={`size-6 shrink-0 rounded-[5px] border-[0.5px] border-destructive/60 bg-transparent p-0 text-destructive hover:border-destructive hover:bg-transparent ${className ?? ""}`}
        aria-label={ariaLabel}
      >
        <Trash className="size-4" aria-hidden />
      </Button>

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close dialog"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-lg border bg-card p-4 shadow-lg">
            <h3 className="text-sm font-semibold">Delete item?</h3>
            <p className="mt-2 text-xs text-muted-foreground">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => {
                  onClick();
                  setConfirmOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function TableActionsMenu({
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
}: ActionMenuProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="icon-sm" variant="ghost" aria-label="Open actions">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="start" className="w-40">
          {onEdit ? <DropdownMenuItem onClick={onEdit}>{editLabel}</DropdownMenuItem> : null}
          {onDelete ? <DropdownMenuItem onClick={() => setConfirmOpen(true)}>{deleteLabel}</DropdownMenuItem> : null}
        </DropdownMenuContent>
      </DropdownMenu>

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close dialog"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-lg border bg-card p-4 shadow-lg">
            <h3 className="text-sm font-semibold">Delete item?</h3>
            <p className="mt-2 text-xs text-muted-foreground">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => {
                  onDelete?.();
                  setConfirmOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
