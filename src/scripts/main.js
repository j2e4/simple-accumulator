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

/**
 * @param {number} va
 * @param {string} label
 * @param {number} [min]
 * @param {number} [max]
 * @returns {boolean}
 */
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
        const now = new Date();
        const sacThead = createSacThead(1, 12);

        sacThead.forEachTd(0, td => {
            now.setMonth(now.getMonth() + 1);
            td.innerHTML = `${now.getFullYear()}-` +
                `${now.getMonth() + 1}`.padStart(2, '0');
        });
        return sacThead.getThead();
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
