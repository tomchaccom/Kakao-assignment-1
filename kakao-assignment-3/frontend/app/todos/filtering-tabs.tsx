import Link from "next/link";

type FilteringTabsProps = {
  currentFilter: string;
  searchTerm: string;
  selectedDateKey: string;
};

const filters = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행 중" },
  { key: "completed", label: "완료" },
];

export default function FilteringTabs({
  currentFilter,
  searchTerm,
  selectedDateKey,
}: FilteringTabsProps) {
  return (
    <nav aria-label="Todo 상태 필터" className="my-4 flex gap-2.5">
      {filters.map(({ key, label }) => {
        const params = new URLSearchParams({ date: selectedDateKey });
        if (key !== "all") {
          params.set("filter", key);
        }
        if (searchTerm) {
          params.set("search", searchTerm);
        }

        const isSelected = currentFilter === key;
        const stateClasses = isSelected
          ? "bg-[#5f1bd5] text-white shadow-[0_4px_10px_rgba(95,27,213,0.2)]"
          : "bg-[#f1edf8] text-[#a39cb5] hover:bg-[#e8e0f4] hover:text-[#7c6fa0]";

        return (
          <Link
            key={key}
            href={`/todos?${params.toString()}`}
            aria-current={isSelected ? "page" : undefined}
            className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition ${stateClasses}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
