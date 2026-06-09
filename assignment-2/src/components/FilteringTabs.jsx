export default function FilteringTabs({ currentFilter, setCurrentFilter }) {
    return (
        <div className="filter-section">
            <button 
                className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} 
                data-filter="all"
                onClick={() => setCurrentFilter('all')}
            >
                전체
            </button>
            <button 
                className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`} 
                data-filter="active"
                onClick={() => setCurrentFilter('active')}
            >
                진행 중
            </button>
            <button 
                className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`} 
                data-filter="completed"
                onClick={() => setCurrentFilter('completed')}
            >
                완료
            </button>
        </div>
    );
}