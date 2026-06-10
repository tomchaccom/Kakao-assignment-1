import { useState, useEffect, useRef } from 'react';
import { formatDateKey } from '../utils/date';

const TODO_STORAGE_KEY = 'todo-list';

function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (storedTodos !== null) {
        return JSON.parse(storedTodos).map(todo => ({
            ...todo,
            isEditing: false
        }));
    }
    return [];
}

export function useTodos(selectedDate) {
    const [todos, setTodos] = useState(loadTodosFromStorage);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // 최초 마운트 시에는 저장하지 않음 (초기값 []로 덮어쓰기 방지)
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        if (text.trim() === '') {
            setIsErrorVisible(true);
            return;
        }
        setIsErrorVisible(false);

        const newTodo = {
            id: Date.now().toString(),
            text: text.trim(),
            date: formatDateKey(selectedDate),
            isCompleted: false,
            isEditing: false
        };

        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (todoId) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    const toggleComplete = (todoId) => {
        setTodos(todos.map(todo => 
            todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
    };

    const startEdit = (todoId) => {
        setTodos(todos.map(todo => 
            todo.id === todoId ? { ...todo, isEditing: true } : todo
        ));
    };

    const saveEdit = (todoId, newText) => {
        if (newText.trim() === '') {
            alert('수정할 내용을 입력해주세요.');
            return;
        }
        setTodos(todos.map(todo => 
            todo.id === todoId ? { ...todo, text: newText.trim(), isEditing: false } : todo
        ));
    };

    const cancelEdit = (todoId) => {
        setTodos(todos.map(todo => 
            todo.id === todoId ? { ...todo, isEditing: false } : todo
        ));
    };

    return {
        todos,
        isErrorVisible,
        addTodo,
        deleteTodo,
        toggleComplete,
        startEdit,
        saveEdit,
        cancelEdit
    };
}
