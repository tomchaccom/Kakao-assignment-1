import Link from "next/link";

import type { Todo } from "@/app/actions";
import {
  formatDateKey,
  formatDayName,
  getWeekDates,
  shiftDate,
} from "@/app/todos/date-utils";

type WeekCalendarProps = {
  currentFilter: string;
  searchTerm: string;
  selectedDate: Date;
  todos: Todo[];
};

function getTodosHref(date: Date, filter: string, searchTerm: string) {
  const params = new URLSearchParams({ date: formatDateKey(date) });
  if (filter !== "all") {
    params.set("filter", filter);
  }
  if (searchTerm) {
    params.set("search", searchTerm);
  }
  return `/todos?${params.toString()}`;
}

export default function WeekCalendar({
  currentFilter,
  searchTerm,
  selectedDate,
  todos,
}: WeekCalendarProps) {
  const weekDates = getWeekDates(selectedDate);
  const weekStartDate = weekDates[0];
  const weekEndDate = weekDates.at(-1) ?? weekStartDate;
  const selectedDateKey = formatDateKey(selectedDate);
  const todayKey = formatDateKey(new Date());

  return (
    <section className="mb-5">
      <div className="flex items-center justify-between gap-3 px-1 py-2">
        <Link
          href={getTodosHref(
            shiftDate(selectedDate, -7),
            currentFilter,
            searchTerm,
          )}
          aria-label="이전 주"
          className="flex h-8 w-8 items-center justify-center bg-transparent text-lg text-[#5f1bd5] transition hover:opacity-60"
        >
          ◀
        </Link>
        <p className="flex-1 text-center text-sm font-bold tracking-wide text-[#5f1bd5]">
          {formatDateKey(weekStartDate)} ~ {formatDateKey(weekEndDate)}
        </p>
        <Link
          href={getTodosHref(
            shiftDate(selectedDate, 7),
            currentFilter,
            searchTerm,
          )}
          aria-label="다음 주"
          className="flex h-8 w-8 items-center justify-center bg-transparent text-lg text-[#5f1bd5] transition hover:opacity-60"
        >
          ▶
        </Link>
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {weekDates.map((date) => {
          const dateKey = formatDateKey(date);
          const isSelected = dateKey === selectedDateKey;
          const isToday = dateKey === todayKey;
          const todoCount = todos.filter((todo) => todo.date === dateKey).length;

          const stateClasses = isSelected
            ? "rounded-[18px] bg-gradient-to-br from-[#6324d3] to-[#4f1bc2] text-white shadow-[0_6px_12px_rgba(95,27,213,0.3)]"
            : isToday
              ? "rounded-[18px] bg-transparent text-[#5f1bd5] outline outline-2 outline-[#5f1bd5]"
              : "rounded-[18px] bg-transparent text-[#555] hover:bg-[#f3f0f8]";

          return (
            <Link
              key={dateKey}
              href={getTodosHref(date, currentFilter, searchTerm)}
              aria-current={isSelected ? "date" : undefined}
              className={`flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 py-2 transition ${stateClasses}`}
            >
              <span className="text-[11px] font-semibold opacity-80">
                {formatDayName(date)}
              </span>
              <span className="text-[15px] font-extrabold">
                {date.getDate()}
              </span>
              <span
                className={`text-[10px] font-bold ${
                  isSelected ? "text-white/80" : "text-[#aaa]"
                }`}
              >
                {todoCount}개
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
