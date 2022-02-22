const form = document.querySelector('form');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const income = +document.querySelector('input#income')?.value;
    const savingsRate = +document.querySelector('input#savings-rate')?.value;

    if (invalidInputNumber(income, '월소득', 0))
        return;
    if (invalidInputNumber(savingsRate, '저축률', 0, 100))
        return;

    console.log(income * savingsRate / 100);
});

function invalidInputNumber(va, label, min, max) {
    if (!va) {
        alert(`${label} 값이 필요합니다.`);
        return true;
    } else if (min !== undefined && va < min) {
        alert(`${label} 값은 ${min}보다 작을 수 없습니다.`);
        return true;

    } else if (max !== undefined && va > max) {
        alert(`${label} 값은 ${max}보다 클 수 없습니다.`);
        return true;
    }
}
