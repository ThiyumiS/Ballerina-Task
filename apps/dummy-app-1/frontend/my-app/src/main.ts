export {};

const first = document.getElementById("first") as HTMLInputElement | null;
const second = document.getElementById("second") as HTMLInputElement | null;
const op = document.getElementById("op") as HTMLSelectElement | null;
const result = document.getElementById("result") as HTMLDivElement | null;
const button = document.getElementById("calc") as HTMLButtonElement | null;

if (first && second && op && result && button) {
  button.addEventListener("click", () => {
    const a = Number(first.value);
    const b = Number(second.value);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      result.textContent = "Result: Please enter valid numbers";
      return;
    }

    let value: number;
    if (op.value === "+") value = a + b;
    else if (op.value === "-") value = a - b;
    else if (op.value === "*") value = a * b;
    else {
      if (b === 0) {
        result.textContent = "Result: Division by zero is not allowed";
        return;
      }
      value = a / b;
    }

    result.textContent = `Result: ${value}`;
  });
}
