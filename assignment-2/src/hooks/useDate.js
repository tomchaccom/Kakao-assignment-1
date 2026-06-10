import { useState, useEffect, useRef } from 'react';

const DATE_STORAGE_KEY = 'selected-date';

function loadDateFromStorage() {
    const storedDate = localStorage.getItem(DATE_STORAGE_KEY);
    if (storedDate !== null) {
        return new Date(storedDate);
    }
    return new Date();
}

export function useDate() {
    const [selectedDate, setSelectedDate] = useState(loadDateFromStorage);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem(DATE_STORAGE_KEY, selectedDate.toISOString());
    }, [selectedDate]);

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
