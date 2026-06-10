export default function FilteringTabs({ currentFilter, setCurrentFilter }) {
    const baseClasses = "flex-1 border-none rounded-xl py-2.5 text-sm font-semibold cursor-pointer transition-all duration-200";

    const getButtonClasses = (filter) => {
        return currentFilter === filter
            ? `${baseClasses} bg-[#5f1bd5] text-white shadow-[0_4px_10px_rgba(95,27,213,0.2)]`
            : `${baseClasses} bg-[#f1edf8] text-[#a39cb5] hover:bg-[#e8e0f4] hover:text-[#7c6fa0]`;
    };

    return (
        <div className="flex gap-2.5 my-4">
            <button 
                className={getButtonClasses('all')} 
                data-filter="all"
                onClick={() => setCurrentFilter('all')}
            >
                전체
            </button>
            <button 
                className={getButtonClasses('active')} 
                data-filter="active"
                onClick={() => setCurrentFilter('active')}
            >
                진행 중
            </button>
            <button 
                className={getButtonClasses('completed')} 
                data-filter="completed"
                onClick={() => setCurrentFilter('completed')}
            >
                완료
            </button>
        </div>
    );
}