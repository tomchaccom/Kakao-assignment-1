import { useState } from 'react';
import { formatDateKey } from '../utils/date';

export function useFilter(todos, selectedDate) {
    const [currentFilter, setCurrentFilter] = useState('all');

    const getFilteredTodos = () => {
        const selectedDateKey = formatDateKey(selectedDate);
        const selectedDateTodos = todos.filter(todo => todo.date === selectedDateKey);

        if (currentFilter === 'active') {
            return selectedDateTodos.filter(todo => !todo.isCompleted);
        }

        if (currentFilter === 'completed') {
            return selectedDateTodos.filter(todo => todo.isCompleted);
        }

        return selectedDateTodos;
    };

    return {
        currentFilter,
        setCurrentFilter,
        filteredTodos: getFilteredTodos()
    };
}
