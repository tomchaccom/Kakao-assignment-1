import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, deleteTodo, toggleComplete, startEdit, saveEdit, cancelEdit }) {
    return (
        <ul id="todo-list">
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    cancelEdit={cancelEdit}
                />
            ))}
        </ul>
    );
}