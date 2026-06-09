
export default function WeekCalendar(){

    return (
        <div className="date-section">
            <div className="date-header">
                <button id="prev-date-btn" className="date-btn" aria-label="이전 주">&lt;</button>
                <p id="current-date" className="current-date">아직 아무것도 안넣음</p>
                <button id="next-date-btn" className="date-btn" aria-label="다음 주">&gt;</button>
            </div>
            <div id="date-list" className="date-list"></div>
        </div>

    )
}