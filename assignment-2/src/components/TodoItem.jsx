import TodoItemView from "./TodoItemView.jsx";
import TodoItemEdit from "./TodoItemEdit.jsx";

export default function TodoItem({ todo, deleteTodo, toggleComplete, startEdit, saveEdit, cancelEdit }) {
    if (todo.isEditing) {
        return (
            <TodoItemEdit 
                todo={todo} 
                saveEdit={saveEdit} 
                cancelEdit={cancelEdit} 
            />
        );
    }

    return (
        <TodoItemView 
            todo={todo} 
            toggleComplete={toggleComplete} 
            startEdit={startEdit} 
            deleteTodo={deleteTodo} 
        />
    );
}
