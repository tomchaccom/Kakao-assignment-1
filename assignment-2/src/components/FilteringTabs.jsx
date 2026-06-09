
export default function FilteringTabs(){
    return (
        <div className="filter-section">
            <button className="filter-btn active" data-filter="all">전체</button>
            <button className="filter-btn" data-filter="active">진행 중</button>
            <button className="filter-btn" data-filter="completed">완료</button>
        </div>
    )
}