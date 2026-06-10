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
        <div className="flex mb-3 rounded-2xl border border-[#e8e8e8] overflow-hidden transition-all duration-200 focus-within:border-[#c6b4ef]">
            <input 
                type="text" 
                id="todo-input" 
                className="flex-1 py-3 px-4 border-none text-base outline-none bg-transparent placeholder:text-[#ccc]"
                placeholder="새로운 할 일을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button 
                id="add-btn" 
                className="bg-[#5f1bd5] text-white border-none px-6 text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-[#4f15b5]"
                onClick={handleAdd}
            >
                추가
            </button>
        </div>
    );
}