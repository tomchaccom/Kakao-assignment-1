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
        <li className="py-4 border-b border-[#f0f0f0] transition-all duration-200">
            <div className="flex items-center gap-2">
                <input 
                    type="text" 
                    className="flex-1 py-2 px-3 border border-[#c6b4ef] rounded-xl text-[15px] outline-none bg-[#faf8ff] transition-colors duration-200 focus:border-[#5f1bd5]"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <button 
                    className="border-none py-1.5 px-3.5 rounded-lg text-[13px] cursor-pointer font-medium transition-all duration-200 text-white bg-[#5f1bd5] hover:bg-[#4f15b5]"
                    onClick={handleSave}
                >
                    확인
                </button>
                <button 
                    className="border-none py-1.5 px-3.5 rounded-lg text-[13px] cursor-pointer font-medium transition-all duration-200 text-[#888] bg-[#f0f0f0] hover:bg-[#e0e0e0]"
                    onClick={() => cancelEdit(todo.id)}
                >
                    취소
                </button>
            </div>
        </li>
    );
}
