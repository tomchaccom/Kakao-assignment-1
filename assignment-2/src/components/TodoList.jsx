import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, deleteTodo, toggleComplete, startEdit, saveEdit, cancelEdit }) {
    return (
        <ul id="todo-list" className="list-none max-h-[350px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#ddd] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
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