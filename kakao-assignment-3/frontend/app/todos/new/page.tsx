import Link from "next/link";

import { createTodo } from "@/app/actions";
import TodoForm from "@/app/todos/todo-form";

export default function NewTodoPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-5 py-12">
      <section className="rounded-[28px] bg-white p-6 shadow-[0_16px_50px_rgba(72,48,110,0.12)] sm:p-8">
        <Link
          href="/todos"
          className="mb-6 inline-flex text-sm font-semibold text-[#6f5f84] hover:text-[#5f1bd5]"
        >
          ← 목록으로
        </Link>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#341b59]">
          Todo 생성
        </h1>
        <p className="mb-8 text-sm text-[#897c98]">
          새로 진행할 할 일을 입력해주세요.
        </p>

        <TodoForm action={createTodo} submitLabel="Todo 생성" />
      </section>
    </main>
  );
}
