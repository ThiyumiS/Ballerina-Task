const textArea = document.getElementById('sentence');
const button = document.getElementById('count');
const result = document.getElementById('result');
if (textArea && button && result) {
    button.addEventListener('click', () => {
        const trimmed = textArea.value.trim();
        const count = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
        result.textContent = `Words: ${count}`;
    });
}
