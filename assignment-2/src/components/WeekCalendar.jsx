import { getWeekDates, formatDateKey } from "../utils/date.js";
import CalendarHeader from "./CalendarHeader.jsx";
import DateCard from "./DateCard.jsx";

export default function WeekCalendar({ selectedDate, changeSelectedDate, selectDate, todos }) {
    const weekDates = getWeekDates(selectedDate);
    const weekStartDate = weekDates[0];
    const weekEndDate = weekDates[weekDates.length - 1];

    const getTodoCountByDate = (dateKey) => {
        return todos.filter(todo => todo.date === dateKey).length;
    };

    return (
        <div className="mb-5">
            <CalendarHeader 
                weekStartDate={weekStartDate} 
                weekEndDate={weekEndDate} 
                changeSelectedDate={changeSelectedDate} 
            />
            <div id="date-list" className="grid grid-cols-7 gap-1 mt-1">
                {weekDates.map((date) => (
                    <DateCard 
                        key={formatDateKey(date)} 
                        date={date} 
                        selectedDate={selectedDate} 
                        todoCount={getTodoCountByDate(formatDateKey(date))} 
                        onSelect={selectDate} 
                    />
                ))}
            </div>
        </div>
    );
}