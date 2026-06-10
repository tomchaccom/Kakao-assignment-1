import { formatDateKey } from "../utils/date.js";

export default function CalendarHeader({ weekStartDate, weekEndDate, changeSelectedDate }) {
    return (
        <div className="flex items-center justify-between gap-3 py-2 px-1">
            <button 
                id="prev-date-btn" 
                className="w-8 h-8 border-none bg-transparent text-[#5f1bd5] text-lg cursor-pointer transition-all duration-200 hover:opacity-60 flex items-center justify-center"
                aria-label="이전 주"
                onClick={() => changeSelectedDate(-7)}
            >◀</button>
            <p id="current-date" className="flex-1 text-[#5f1bd5] text-sm font-bold text-center tracking-wide">
                {`${formatDateKey(weekStartDate)} ~ ${formatDateKey(weekEndDate)}`}
            </p>
            <button 
                id="next-date-btn" 
                className="w-8 h-8 border-none bg-transparent text-[#5f1bd5] text-lg cursor-pointer transition-all duration-200 hover:opacity-60 flex items-center justify-center"
                aria-label="다음 주"
                onClick={() => changeSelectedDate(7)}
            >▶</button>
        </div>
    );
}
