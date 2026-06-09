export function getWeekDates(date) {
    const weekStartDate = getWeekStartDate(date);
    const weekDates = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        weekDates.push(new Date(
            weekStartDate.getFullYear(),
            weekStartDate.getMonth(),
            weekStartDate.getDate() + dayIndex
        ));
    }

    return weekDates;
}

export function getWeekStartDate(date) {
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayIndex);
}

export function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return [year, month, day].join('-');
}

export function formatDayName(date) {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    return dayNames[date.getDay()];
}
