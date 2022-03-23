class PeriodManager {
    constructor($income, $period, $radios) {
        /** @type {Object.<string, HTMLLabelElement>} */
        this.$income = $income;
        /** @type {Object.<string, HTMLLabelElement>} */
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
        const ret = [now.getFullYear()];
        if (this.type === PeriodType.month)
            ret.push(`${now.getMonth() + 1}`.padStart(2, '0'));
        return ret.join('-');
    }

    _watch() {
        this.$radios.forEach($radio =>
            $radio.addEventListener('click', (evt) => {
                if (evt.target.value === PeriodType.month) {
                    this._render(this.$income.$label, '월소득(만원): ');
                    this.$income.$input.setAttribute('placeholder', MinimumIncome[PeriodType.month]);
                    this._render(this.$period.$label, '기간(개월): ');
                    this.$period.$input.setAttribute('placeholder', '12');
                } else if (evt.target.value === PeriodType.year) {
                    this._render(this.$income.$label, '연소득(만원): ');
                    this.$income.$input.setAttribute('placeholder', MinimumIncome[PeriodType.year]);
                    this._render(this.$period.$label, '기간(년): ');
                    this.$period.$input.setAttribute('placeholder', '10');
                }
            }));
    }

    _render($el, innerHtml) {
        $el.innerHTML = innerHtml;
    }
}