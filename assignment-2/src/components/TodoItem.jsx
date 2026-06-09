import { useState, useRef, useEffect } from "react";

export default function TodoItem({ todo, deleteTodo, toggleComplete, startEdit, saveEdit, cancelEdit }) {
    const [editValue, setEditValue] = useState(todo.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (todo.isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.selectionStart = inputRef.current.value.length;
        }
    }, [todo.isEditing]);

    const handleSave = () => {
        saveEdit(todo.id, editValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    if (todo.isEditing) {
        return (
            <li className="todo-item">
                <div className="todo-content">
                    <input 
                        type="text" 
                        className="edit-input" 
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                    />
                </div>
                <div className="btn-group" style={{ opacity: 1 }}>
                    <button className="action-btn save-btn" onClick={handleSave}>저장</button>
                    <button className="action-btn delete-btn" onClick={() => cancelEdit(todo.id)}>취소</button>
                </div>
            </li>
        );
    }

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
                <button className="action-btn edit-btn" onClick={() => {
                    setEditValue(todo.text); // Reset edit value when starting to edit
                    startEdit(todo.id);
                }}>수정</button>
                <button className="action-btn delete-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
            </div>
        </li>
    );
}
