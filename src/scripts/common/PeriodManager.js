class PeriodManager {
    constructor($income, $period, $radios) {
        /** @type {FormInputGroup} */
        this.$income = $income;
        /** @type {FormInputGroup} */
        this.$period = $period;
        /** @type {Array.<HTMLInputElement>} */
        this.$radios = $radios || [];

        /** @type {string} */
        this.type = undefined;

        this._watch();
    }

    set periodType(type) {
        this.type = type;
    }

    get min() {
        if (this.type === PeriodType.month)
            return 12;
        else if (this.type === PeriodType.year)
            return 10;
    }

    get max() {
        if (this.type === PeriodType.month)
            return 1200;
        else if (this.type === PeriodType.year)
            return 100;
    }

    get unitText() {
        if (this.type === PeriodType.month)
            return '한 달';
        else if (this.type === PeriodType.year)
            return '연간';
    }

    getNextTime(now) {
        const _now = new Date(now.getTime());
        if (this.type === PeriodType.month) {
            _now.setMonth(_now.getMonth() + 1);
            return _now.getTime();
        } else if (this.type === PeriodType.year) {
            _now.setFullYear(_now.getFullYear() + 1);
            return _now.getTime();
        }
    }

    getTableText(now) {
        const ret = [`${now.getFullYear()}년`];
        if (this.type === PeriodType.month)
            ret.push(`${now.getMonth() + 1}월`);
        return ret.join(' ');
    }

    _watch() {
        this.$radios.forEach($radio =>
            $radio.addEventListener('click', (evt) => {
                if (evt.target.value === PeriodType.month) {
                    this.$income.label = '월소득(만원): ';
                    this.$income.placeholder = MinimumIncome[PeriodType.month];
                    this.$period.label = '기간(개월): ';
                    this.$period.placeholder = '12';
                } else if (evt.target.value === PeriodType.year) {
                    this.$income.label = '연소득(만원): ';
                    this.$income.placeholder = MinimumIncome[PeriodType.year];
                    this.$period.label = '기간(년): ';
                    this.$period.placeholder = '10';
                }
            }));
    }

    // _render($el, innerHtml) {
    //     $el.innerHTML = innerHtml;
    // }
}
