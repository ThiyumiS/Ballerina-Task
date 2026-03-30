export {};

const textArea = document.getElementById(
  "sentence",
) as HTMLTextAreaElement | null;
const button = document.getElementById("count") as HTMLButtonElement | null;
const result = document.getElementById("result") as HTMLDivElement | null;

if (textArea && button && result) {
  button.addEventListener("click", () => {
    const trimmed = textArea.value.trim();
    const count = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    result.textContent = `Words: ${count}`;
  });
}
