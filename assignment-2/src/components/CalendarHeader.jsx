import { formatDateKey } from "../utils/date.js";

export default function CalendarHeader({ weekStartDate, weekEndDate, changeSelectedDate }) {
    return (
        <div className="date-header">
            <button 
                id="prev-date-btn" 
                className="date-btn" 
                aria-label="이전 주"
                onClick={() => changeSelectedDate(-7)}
            >&lt;</button>
            <p id="current-date" className="current-date">
                {`${formatDateKey(weekStartDate)} ~ ${formatDateKey(weekEndDate)}`}
            </p>
            <button 
                id="next-date-btn" 
                className="date-btn" 
                aria-label="다음 주"
                onClick={() => changeSelectedDate(7)}
            >&gt;</button>
        </div>
    );
}
