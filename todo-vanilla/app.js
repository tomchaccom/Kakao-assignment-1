const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');
const filterButtons = document.querySelectorAll('.filter-btn');
const currentDateElement = document.getElementById('current-date');
const dateListElement = document.getElementById('date-list');
const previousDateButton = document.getElementById('prev-date-btn');
const nextDateButton = document.getElementById('next-date-btn');
const TODO_STORAGE_KEY = 'todo-list';

let todos = [];
let currentFilter = 'all';
let selectedDate = new Date();

function init() {
    loadTodosFromStorage();
    renderDatePicker();
    renderTodos();

    addButton.addEventListener('click', handleAddTodo);
    previousDateButton.addEventListener('click', () => changeSelectedDate(-7));
    nextDateButton.addEventListener('click', () => changeSelectedDate(7));

    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    });

    filterButtons.forEach((filterButton) => {
        filterButton.addEventListener('click', () => {
            changeFilter(filterButton.dataset.filter);
        });
    });
}

function handleAddTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        showError(true);
        todoInput.focus();
        return;
    }

    showError(false);

    const newTodo = {
        id: Date.now().toString(),
        text: todoText,
        date: formatDateKey(selectedDate),
        isCompleted: false,
        isEditing: false
    };

    todos.push(newTodo);
    saveTodosToStorage();
    renderDatePicker();
    renderTodos();

    todoInput.value = '';
    todoInput.focus();
}

function showError(shouldShow) {
    if (shouldShow) {
        errorMessage.classList.remove('hidden');
        return;
    }

    errorMessage.classList.add('hidden');
}

function saveTodosToStorage() {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

    if (storedTodos === null) {
        return;
    }

    todos = JSON.parse(storedTodos).map(todo => ({
        ...todo,
        isEditing: false
    }));
}

function changeSelectedDate(dayAmount) {
    selectedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + dayAmount
    );

    renderDatePicker();
    renderTodos();
}

function selectDate(date) {
    selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    renderDatePicker();
    renderTodos();
}

function renderDatePicker() {
    const weekDates = getWeekDates(selectedDate);
    const weekStartDate = weekDates[0];
    const weekEndDate = weekDates[weekDates.length - 1];

    currentDateElement.textContent = `${formatDateKey(weekStartDate)} ~ ${formatDateKey(weekEndDate)}`;
    dateListElement.innerHTML = '';

    weekDates.forEach((date) => {
        const dateButton = document.createElement('button');
        const dateKey = formatDateKey(date);
        const todoCount = getTodoCountByDate(dateKey);
        const isSelected = dateKey === formatDateKey(selectedDate);
        const isToday = dateKey === formatDateKey(new Date());

        dateButton.className = `date-card ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}`;
        dateButton.type = 'button';
        dateButton.innerHTML = `
            <span class="date-day">${formatDayName(date)}</span>
            <span class="date-number">${date.getDate()}</span>
            <span class="date-count">${todoCount}개</span>
        `;
        dateButton.addEventListener('click', () => selectDate(date));

        dateListElement.appendChild(dateButton);
    });
}

function getTodoCountByDate(dateKey) {
    return todos.filter(todo => todo.date === dateKey).length;
}

function getWeekDates(date) {
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

function getWeekStartDate(date) {
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;

    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayIndex);
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return [year, month, day].join('-');
}

function formatDayName(date) {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    return dayNames[date.getDay()];
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    saveTodosToStorage();
    renderDatePicker();
    renderTodos();
}

function toggleComplete(todoId) {
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
    });

    saveTodosToStorage();
    renderDatePicker();
    renderTodos();
}

function startEdit(todoId) {
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, isEditing: true };
        }

        return todo;
    });

    renderTodos();
}

function saveEdit(todoId, newText) {
    const trimmedText = newText.trim();

    if (trimmedText === '') {
        alert('수정할 내용을 입력해주세요.');
        return;
    }

    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, text: trimmedText, isEditing: false };
        }

        return todo;
    });

    saveTodosToStorage();
    renderDatePicker();
    renderTodos();
}

function cancelEdit(todoId) {
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, isEditing: false };
        }

        return todo;
    });

    renderTodos();
}

function changeFilter(filterValue) {
    currentFilter = filterValue;

    filterButtons.forEach((filterButton) => {
        const isSelected = filterButton.dataset.filter === currentFilter;
        filterButton.classList.toggle('active', isSelected);
    });

    renderTodos();
}

function getFilteredTodos() {
    const selectedDateKey = formatDateKey(selectedDate);
    const selectedDateTodos = todos.filter(todo => todo.date === selectedDateKey);

    if (currentFilter === 'active') {
        return selectedDateTodos.filter(todo => !todo.isCompleted);
    }

    if (currentFilter === 'completed') {
        return selectedDateTodos.filter(todo => todo.isCompleted);
    }

    return selectedDateTodos;
}

function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        return;
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.isCompleted ? 'completed' : ''}`;

        if (todo.isEditing) {
            const inputHTML = `<input type="text" class="edit-input" value="${todo.text}">`;
            const buttonsHTML = `
                <div class="btn-group" style="opacity: 1;">
                    <button class="action-btn save-btn">저장</button>
                    <button class="action-btn delete-btn">취소</button>
                </div>
            `;

            li.innerHTML = `
                <div class="todo-content">
                    ${inputHTML}
                </div>
                ${buttonsHTML}
            `;

            const editInput = li.querySelector('.edit-input');
            const saveButton = li.querySelector('.save-btn');
            const cancelButton = li.querySelector('.delete-btn');

            setTimeout(() => {
                editInput.focus();
                editInput.selectionStart = editInput.selectionEnd = editInput.value.length;
            }, 0);

            saveButton.addEventListener('click', () => saveEdit(todo.id, editInput.value));
            cancelButton.addEventListener('click', () => cancelEdit(todo.id));
            editInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    saveEdit(todo.id, editInput.value);
                }
            });
        } else {
            const textHTML = `<span class="todo-text">${todo.text}</span>`;
            const buttonsHTML = `
                <div class="btn-group">
                    <button class="action-btn complete-btn">${todo.isCompleted ? '취소' : '완료'}</button>
                    <button class="action-btn edit-btn">수정</button>
                    <button class="action-btn delete-btn">삭제</button>
                </div>
            `;

            li.innerHTML = `
                <div class="todo-content">
                    ${textHTML}
                </div>
                ${buttonsHTML}
            `;

            const completeButton = li.querySelector('.complete-btn');
            const editButton = li.querySelector('.edit-btn');
            const deleteButton = li.querySelector('.delete-btn');

            completeButton.addEventListener('click', () => toggleComplete(todo.id));
            editButton.addEventListener('click', () => startEdit(todo.id));
            deleteButton.addEventListener('click', () => deleteTodo(todo.id));
        }

        todoList.appendChild(li);
    });
}

init();
