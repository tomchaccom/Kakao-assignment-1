export default function TodoItemView({ todo, toggleComplete, startEdit, deleteTodo }) {
    return (
        <li className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
            <div className="todo-content">
                <span className="todo-text">{todo.text}</span>
            </div>
            <div className="btn-group">
                <button 
                    className="action-btn complete-btn" 
                    onClick={() => toggleComplete(todo.id)}
                >
                    {todo.isCompleted ? '취소' : '완료'}
                </button>
                <button className="action-btn edit-btn" onClick={() => startEdit(todo.id)}>수정</button>
                <button className="action-btn delete-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
            </div>
        </li>
    );
}
