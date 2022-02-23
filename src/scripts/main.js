const form = document.querySelector('form');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const income = +document.querySelector('input#income')?.value;
    const savingsRate = +document.querySelector('input#savings-rate')?.value;

    if (invalidInputNumber(income, '월소득', 0))
        return;
    if (invalidInputNumber(savingsRate, '저축률', 0, 100))
        return;

    createResTable(income * savingsRate / 100);
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

function createResTable(monthlySavings) {
    const section = document.querySelector('#res-section');
    const p = document.querySelector('#res-section p');
    const table = document.createElement('table');
    
    section.innerHTML = '';
    // TODO 단위가 넘어가는 경우
    p.innerHTML = `계산된 한 달 저축액은 ${monthlySavings}만원입니다.`;
    table.append(createThead(), createTbody());
    section.append(p, table);

    function createThead() {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const now = new Date();

        for (let i = 0; i < 12; i++) {
            now.setMonth(now.getMonth() + 1);

            const td = document.createElement('td');
            td.innerHTML = `${now.getFullYear()}-` +
                `${now.getMonth() + 1}`.padStart(2, '0');
            tr.appendChild(td);
        }
        thead.appendChild(tr);
        return thead;
    }

    function createTbody() {
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');

        for (let i = 0; i < 12; i++) {
            const td = document.createElement('td');
            td.innerHTML = monthlySavings * (i + 1);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        return tbody;
    }
}
