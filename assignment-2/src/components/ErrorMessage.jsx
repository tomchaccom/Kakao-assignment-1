export default function ErrorMessage({ isVisible }) {
    return (
        <p id="error-message" className={`error-message ${isVisible ? '' : 'hidden'}`}>
            할 일을 입력해주세요.
        </p>
    );
}