"use client";

import { useActionState } from "react";

import type { Todo, TodoFormState } from "@/app/actions";

type TodoFormAction = (
  state: TodoFormState,
  formData: FormData,
) => Promise<TodoFormState>;

type TodoFormProps = {
  action: TodoFormAction;
  submitLabel: string;
  todo?: Todo;
};

const initialState: TodoFormState = {
  error: null,
};

export default function TodoForm({
  action,
  submitLabel,
  todo,
}: TodoFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-[#4b4357]"
        >
          할 일
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={todo?.title}
          placeholder="할 일을 입력하세요"
          required
          autoFocus
          className="w-full rounded-2xl border border-[#ded6eb] bg-white px-4 py-3 text-[#26212f] outline-none transition focus:border-[#6b32d5] focus:ring-4 focus:ring-[#6b32d5]/10"
        />
      </div>

      {todo ? (
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-[#f7f4fc] px-4 py-3 text-sm font-medium text-[#4b4357]">
          <input
            name="completed"
            type="checkbox"
            defaultChecked={todo.completed}
            className="h-4 w-4 accent-[#5f1bd5]"
          />
          완료한 Todo로 표시
        </label>
      ) : null}

      {state.error ? (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-[#5f1bd5] px-4 py-3 font-semibold text-white transition hover:bg-[#4d15b5] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "저장 중..." : submitLabel}
      </button>
    </form>
  );
}
