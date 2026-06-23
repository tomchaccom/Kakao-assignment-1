export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseDateKey(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (formatDateKey(parsedDate) !== value) {
    return null;
  }

  return parsedDate;
}

export function getSelectedDate(value?: string) {
  return parseDateKey(value) ?? new Date();
}

export function getWeekDates(date: Date) {
  const mondayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
  const weekStartDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - mondayIndex,
  );

  return Array.from({ length: 7 }, (_, dayIndex) => {
    return new Date(
      weekStartDate.getFullYear(),
      weekStartDate.getMonth(),
      weekStartDate.getDate() + dayIndex,
    );
  });
}

export function shiftDate(date: Date, dayAmount: number) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + dayAmount,
  );
}

export function formatDayName(date: Date) {
  return ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
}
