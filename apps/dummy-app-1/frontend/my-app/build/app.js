const first = document.getElementById('first');
const second = document.getElementById('second');
const op = document.getElementById('op');
const result = document.getElementById('result');
const button = document.getElementById('calc');
if (first && second && op && result && button) {
    button.addEventListener('click', () => {
        const a = Number(first.value);
        const b = Number(second.value);
        if (Number.isNaN(a) || Number.isNaN(b)) {
            result.textContent = 'Result: Please enter valid numbers';
            return;
        }
        let value;
        if (op.value === '+')
            value = a + b;
        else if (op.value === '-')
            value = a - b;
        else if (op.value === '*')
            value = a * b;
        else {
            if (b === 0) {
                result.textContent = 'Result: Division by zero is not allowed';
                return;
            }
            value = a / b;
        }
        result.textContent = `Result: ${value}`;
    });
}
