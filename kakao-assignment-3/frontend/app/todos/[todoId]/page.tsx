import Link from "next/link";
import { notFound } from "next/navigation";

import { getTodo, updateTodo } from "@/app/actions";
import TodoForm from "@/app/todos/todo-form";

export const dynamic = "force-dynamic";

export default async function EditTodoPage({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const parsedTodoId = Number(todoId);

  if (!Number.isInteger(parsedTodoId) || parsedTodoId < 1) {
    notFound();
  }

  const todo = await getTodo(parsedTodoId);

  if (!todo) {
    notFound();
  }

  const updateTodoAction = updateTodo.bind(null, todo.id);

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-5 py-12">
      <section className="rounded-[28px] bg-white p-6 shadow-[0_16px_50px_rgba(72,48,110,0.12)] sm:p-8">
        <Link
          href={`/todos?date=${todo.date}`}
          className="mb-6 inline-flex text-sm font-semibold text-[#6f5f84] hover:text-[#5f1bd5]"
        >
          ← 목록으로
        </Link>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#341b59]">
          Todo 수정
        </h1>
        <p className="mb-8 text-sm text-[#897c98]">
          할 일의 내용과 완료 상태를 변경할 수 있습니다.
        </p>

        <TodoForm
          action={updateTodoAction}
          submitLabel="변경사항 저장"
          todo={todo}
        />
      </section>
    </main>
  );
}
