import { useState, useRef, useEffect } from "react";

export default function TodoItemEdit({ todo, saveEdit, cancelEdit }) {
    const [editValue, setEditValue] = useState(todo.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.selectionStart = inputRef.current.value.length;
        }
    }, []);

    const handleSave = () => {
        saveEdit(todo.id, editValue);
    };

    const handleKeyDown = (e) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            handleSave();
        }
    };

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
