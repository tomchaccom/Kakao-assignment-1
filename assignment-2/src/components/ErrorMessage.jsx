export default function ErrorMessage({ isVisible }) {
    return (
        <p id="error-message" className={`text-[#ff3b30] text-sm h-5 mb-1 ml-1 ${isVisible ? '' : 'invisible'}`}>
            할 일을 입력해주세요.
        </p>
    );
}