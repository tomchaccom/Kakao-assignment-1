import { formatDateKey, formatDayName } from "../utils/date.js";

export default function DateCard({ date, selectedDate, todoCount, onSelect }) {
    const dateKey = formatDateKey(date);
    const isSelected = dateKey === formatDateKey(selectedDate);
    const isToday = dateKey === formatDateKey(new Date());

    return (
        <button 
            type="button"
            className={`date-card ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}`}
            onClick={() => onSelect(date)}
        >
            <span className="date-day">{formatDayName(date)}</span>
            <span className="date-number">{date.getDate()}</span>
            <span className="date-count">{todoCount}개</span>
        </button>
    );
}
