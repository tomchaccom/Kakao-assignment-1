import { useState } from 'react';

export function useDate() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const changeSelectedDate = (dayAmount) => {
        const newDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() + dayAmount
        );
        setSelectedDate(newDate);
    };

    const selectDate = (date) => {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        setSelectedDate(newDate);
    };

    return {
        selectedDate,
        changeSelectedDate,
        selectDate
    };
}
