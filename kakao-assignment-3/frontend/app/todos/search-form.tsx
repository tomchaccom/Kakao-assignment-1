import Link from "next/link";

type SearchFormProps = {
  currentFilter: string;
  searchTerm: string;
  selectedDateKey: string;
};

export default function SearchForm({
  currentFilter,
  searchTerm,
  selectedDateKey,
}: SearchFormProps) {
  const clearParams = new URLSearchParams({ date: selectedDateKey });
  if (currentFilter !== "all") {
    clearParams.set("filter", currentFilter);
  }

  return (
    <form action="/todos" method="get" className="mb-4 flex gap-2">
      <input type="hidden" name="date" value={selectedDateKey} />
      {currentFilter !== "all" ? (
        <input type="hidden" name="filter" value={currentFilter} />
      ) : null}
      <label htmlFor="todo-search" className="sr-only">
        Todo 검색
      </label>
      <input
        id="todo-search"
        name="search"
        type="search"
        defaultValue={searchTerm}
        placeholder="Todo 검색"
        maxLength={100}
        className="min-w-0 flex-1 rounded-2xl border border-[#ded6eb] bg-white px-4 py-3 text-sm text-[#26212f] outline-none transition focus:border-[#6b32d5] focus:ring-4 focus:ring-[#6b32d5]/10"
      />
      <button
        type="submit"
        className="rounded-2xl bg-[#5f1bd5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4d15b5]"
      >
        검색
      </button>
      {searchTerm ? (
        <Link
          href={`/todos?${clearParams.toString()}`}
          className="flex items-center rounded-2xl bg-[#f1edf8] px-4 py-3 text-sm font-semibold text-[#6f5f84] transition hover:bg-[#e8e0f4]"
        >
          초기화
        </Link>
      ) : null}
    </form>
  );
}
