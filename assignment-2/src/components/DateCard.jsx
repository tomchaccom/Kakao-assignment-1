import { formatDateKey, formatDayName } from "../utils/date.js";

export default function DateCard({ date, selectedDate, todoCount, onSelect }) {
    const dateKey = formatDateKey(date);
    const isSelected = dateKey === formatDateKey(selectedDate);
    const isToday = dateKey === formatDateKey(new Date());

    const baseClasses = "flex flex-col items-center justify-center gap-1 min-w-0 min-h-[64px] border-none cursor-pointer transition-all duration-200 py-2";
    
    const stateClasses = isSelected
        ? "bg-gradient-to-br from-[#6324d3] to-[#4f1bc2] text-white rounded-[18px] shadow-[0_6px_12px_rgba(95,27,213,0.3)]"
        : isToday
            ? "bg-transparent text-[#5f1bd5] rounded-[18px] outline outline-2 outline-[#5f1bd5]"
            : "bg-transparent text-[#555] rounded-[18px] hover:bg-[#f3f0f8]";

    return (
        <button 
            type="button"
            className={`${baseClasses} ${stateClasses}`}
            onClick={() => onSelect(date)}
        >
            <span className="text-[11px] font-semibold opacity-80">{formatDayName(date)}</span>
            <span className="text-[15px] font-extrabold">{date.getDate()}</span>
            <span className={`text-[10px] font-bold ${isSelected ? 'text-white/80' : 'text-[#aaa]'}`}>{todoCount}개</span>
        </button>
    );
}
