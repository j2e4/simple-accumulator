const form = document.querySelector('form');
const label = document.querySelector('label[for=period-input]');
const radios = document.querySelectorAll('input[name=period]');
let yearSelected;

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const income = +document.querySelector('input#income')?.value;
    const savingsRate = +document.querySelector('input#savings-rate')?.value;
    const periodInput = +document.querySelector('input#period-input')?.value;
    const periodType = document.querySelector('input[name=period]:checked').value;

    if (invalidInputNumber(income, '월소득', 0))
        return;
    if (invalidInputNumber(savingsRate, '저축률', 0, 100))
        return;
    if (invalidInputNumber(periodInput, '기간', 12, 1200))
        return;

    yearSelected = periodType === PeriodType.year;
    createResTable(income * savingsRate / 100, periodInput);
});

radios.forEach(radio => {
    radio.addEventListener('input', (evt) => {
        if (evt.target.value === PeriodType.month)
            label.innerHTML = '기간(개월): ';
        else if (evt.target.value === PeriodType.year)
            label.innerHTML = '기간(년): ';
    });
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

/**
 * @param {number} amount
 * @param {number} period
 */
function createResTable(amount, period) {
    const section = document.querySelector('#res-section');
    const table = document.createElement('table');

    const unitText = yearSelected ? '연간' : '한 달';
    if (yearSelected)
        amount *= 12;

    section.innerHTML = '';
    // TODO 단위가 넘어가는 경우
    table.append(createThead(), createTbody());
    section.innerHTML = `` +
        `<p>계산된 ${unitText} 저축액은 ${getNumberWithComma(amount)}만원입니다.</p>` +
        `<div class="sac-table-outer">` + table.outerHTML + `</div>`;

    function createThead() {
        const now = new Date();
        const sacThead = createSacThead(1, period);

        sacThead.forEachTd(0, td => {
            if (yearSelected)
                now.setFullYear(now.getFullYear() + 1);
            else
                now.setMonth(now.getMonth() + 1);
            td.innerHTML = `${now.getFullYear()}`;
            if (!yearSelected)
                td.innerHTML += '-' + `${now.getMonth() + 1}`.padStart(2, '0');
        });
        return sacThead.getThead();
    }

    function createTbody() {
        const scaTbody = createSacTbody(1, period);

        scaTbody.forEachTd(0, (td, i) => {
            td.classList.add('sac-number')
            td.innerHTML = `${getNumberWithComma(amount * (i + 1))}`;
        });
        return scaTbody.getTbody();
    }

    function getNumberWithComma(number) {
        const strings = number.toString().split('.');
        const intWithComma = strings
            .shift()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return strings.length ? `${intWithComma}.${strings.shift()}` : intWithComma;
    }
}
