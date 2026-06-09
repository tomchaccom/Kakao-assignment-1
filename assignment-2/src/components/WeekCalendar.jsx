import { getWeekDates, formatDateKey, formatDayName } from "../utils/date.js";

export default function WeekCalendar({ selectedDate, changeSelectedDate, selectDate, todos }) {
    const weekDates = getWeekDates(selectedDate);
    const weekStartDate = weekDates[0];
    const weekEndDate = weekDates[weekDates.length - 1];

    const getTodoCountByDate = (dateKey) => {
        return todos.filter(todo => todo.date === dateKey).length;
    };

    return (
        <div className="date-section">
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
            <div id="date-list" className="date-list">
                {weekDates.map((date) => {
                    const dateKey = formatDateKey(date);
                    const todoCount = getTodoCountByDate(dateKey);
                    const isSelected = dateKey === formatDateKey(selectedDate);
                    const isToday = dateKey === formatDateKey(new Date());

                    return (
                        <button 
                            key={dateKey}
                            type="button"
                            className={`date-card ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}`}
                            onClick={() => selectDate(date)}
                        >
                            <span className="date-day">{formatDayName(date)}</span>
                            <span className="date-number">{date.getDate()}</span>
                            <span className="date-count">{todoCount}개</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}