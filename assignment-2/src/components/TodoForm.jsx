import { useState } from "react";

export default function TodoForm({ addTodo }) {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        addTodo(inputValue);
        if (inputValue.trim() !== "") {
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="input-section">
            <input 
                type="text" 
                id="todo-input" 
                placeholder="새로운 할 일을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button id="add-btn" onClick={handleAdd}>추가</button>
        </div>
    );
}