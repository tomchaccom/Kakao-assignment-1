import Link from "next/link";

import {
  deleteTodo,
  getTodos,
  toggleTodo,
  type TodoFilter,
} from "@/app/actions";
import {
  formatDateKey,
  getSelectedDate,
} from "@/app/todos/date-utils";
import FilteringTabs from "@/app/todos/filtering-tabs";
import SearchForm from "@/app/todos/search-form";
import WeekCalendar from "@/app/todos/week-calendar";

export const dynamic = "force-dynamic";

const validFilters = ["all", "active", "completed"] as const;

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{
    date?: string;
    filter?: string;
    search?: string;
  }>;
}) {
  const { date, filter, search } = await searchParams;
  const selectedDate = getSelectedDate(date);
  const selectedDateKey = formatDateKey(selectedDate);
  const searchTerm = search?.trim().slice(0, 100) ?? "";
  const currentFilter = validFilters.includes(
    filter as (typeof validFilters)[number],
  )
    ? (filter as (typeof validFilters)[number])
    : "all";
  const apiFilter =
    currentFilter === "all" ? undefined : (currentFilter as TodoFilter);
  const [todos, selectedDateTodos, apiFilteredTodos] = await Promise.all([
    getTodos(),
    getTodos(selectedDateKey),
    apiFilter || searchTerm
      ? getTodos(selectedDateKey, apiFilter, searchTerm)
      : Promise.resolve(null),
  ]);
  const filteredTodos = apiFilteredTodos ?? selectedDateTodos;
  const completedCount = selectedDateTodos.filter(
    (todo) => todo.completed,
  ).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-5 py-12">
      <section className="rounded-[28px] bg-white p-6 shadow-[0_16px_50px_rgba(72,48,110,0.12)] sm:p-8">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-[#8d7ba8]">
              {completedCount}/{selectedDateTodos.length} 완료
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#341b59]">
              My Todos
            </h1>
          </div>
          <Link
            href={`/todos/new?date=${selectedDateKey}`}
            className="rounded-2xl bg-[#5f1bd5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4d15b5]"
          >
            Todo 추가
          </Link>
        </header>

        <WeekCalendar
          currentFilter={currentFilter}
          searchTerm={searchTerm}
          selectedDate={selectedDate}
          todos={todos}
        />

        <SearchForm
          currentFilter={currentFilter}
          searchTerm={searchTerm}
          selectedDateKey={selectedDateKey}
        />

        <FilteringTabs
          currentFilter={currentFilter}
          searchTerm={searchTerm}
          selectedDateKey={selectedDateKey}
        />

        {filteredTodos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d9cdea] bg-[#faf8fd] px-6 py-14 text-center">
            <p className="font-semibold text-[#5d526b]">
              {searchTerm
                ? `"${searchTerm}" 검색 결과가 없습니다.`
                : "이 날짜에 표시할 Todo가 없습니다."}
            </p>
            <p className="mt-2 text-sm text-[#9488a3]">
              날짜나 필터를 변경하거나 새 할 일을 추가해보세요.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#eee9f5]">
            {filteredTodos.map((todo) => {
              const toggleAction = toggleTodo.bind(
                null,
                todo.id,
                todo.title,
                !todo.completed,
                todo.date,
              );
              const deleteAction = deleteTodo.bind(null, todo.id);

              return (
                <li
                  key={todo.id}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p
                      className={
                        todo.completed
                          ? "break-words text-[#aaa1b5] line-through"
                          : "break-words font-medium text-[#332c3d]"
                      }
                    >
                      {todo.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-[#9c91aa]">
                      {todo.completed ? "완료" : "진행 중"}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <form action={toggleAction}>
                      <button
                        type="submit"
                        className="rounded-xl bg-[#f0eafa] px-3 py-2 text-sm font-semibold text-[#5f1bd5] transition hover:bg-[#e4d8f6]"
                      >
                        {todo.completed ? "완료 취소" : "완료"}
                      </button>
                    </form>
                    <Link
                      href={`/todos/${todo.id}`}
                      className="rounded-xl bg-[#f0eafa] px-3 py-2 text-sm font-semibold text-[#5f1bd5] transition hover:bg-[#e4d8f6]"
                    >
                      수정
                    </Link>
                    <form action={deleteAction}>
                      <button
                        type="submit"
                        className="rounded-xl bg-[#2e2933] px-3 py-2 text-sm font-semibold text-white transition hover:bg-black"
                      >
                        삭제
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
