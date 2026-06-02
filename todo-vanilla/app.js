const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');
const filterButtons = document.querySelectorAll('.filter-btn');

let todos = [];
let currentFilter = 'all';

function init() {
    addButton.addEventListener('click', handleAddTodo);

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
        isCompleted: false,
        isEditing: false
    };

    todos.push(newTodo);
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

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    renderTodos();
}

function toggleComplete(todoId) {
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
    });

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
    if (currentFilter === 'active') {
        return todos.filter(todo => !todo.isCompleted);
    }

    if (currentFilter === 'completed') {
        return todos.filter(todo => todo.isCompleted);
    }

    return todos;
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
