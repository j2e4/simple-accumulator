class SacTableElement {
    constructor() {
        /** @member {Array.<HTMLTableRowElement>} */
        this.rows = [];
        /** @member {Array.<Array.<HTMLTableCellElement>>} */
        this.cellsByRi = [];
    }

    forEachTd(ri, doForEach) {
        this.cellsByRi[ri].forEach(doForEach);
    }

    appendTr() {
        const tr = document.createElement('tr');
        this.rows.push(tr);
    }

    appendTd(ri) {
        const td = document.createElement('td');
        if (!this.cellsByRi[ri])
            this.cellsByRi[ri] = [];
        this.cellsByRi[ri].push(td);
        this.rows[ri].appendChild(td);
    }
}
