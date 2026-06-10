export default function TodoItemView({ todo, toggleComplete, startEdit, deleteTodo }) {
    const textClasses = todo.isCompleted
        ? "text-[15px] break-all transition-colors duration-200 line-through text-[#bbb]"
        : "text-[15px] break-all transition-colors duration-200 text-[#333]";

    return (
        <li className="flex items-center justify-between py-4 border-b border-[#f0f0f0] transition-all duration-200 group">
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <span className={textClasses}>{todo.text}</span>
            </div>
            <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-[480px]:opacity-100">
                <button 
                    className="border-none py-1 px-3 rounded-lg text-[13px] cursor-pointer font-medium transition-all duration-200 text-[#5f1bd5] bg-[#f1edf8] hover:bg-[#e0d4f5]"
                    onClick={() => toggleComplete(todo.id)}
                >
                    {todo.isCompleted ? '취소' : '완료'}
                </button>
                <button 
                    className="border-none py-1 px-3 rounded-lg text-[13px] cursor-pointer font-medium transition-all duration-200 text-[#5f1bd5] bg-[#f1edf8] hover:bg-[#e0d4f5]"
                    onClick={() => startEdit(todo.id)}
                >
                    수정
                </button>
                <button 
                    className="border-none py-1 px-3 rounded-lg text-[13px] cursor-pointer font-medium transition-all duration-200 text-white bg-[#1c1c1e] hover:bg-[#333]"
                    onClick={() => deleteTodo(todo.id)}
                >
                    삭제
                </button>
            </div>
        </li>
    );
}
