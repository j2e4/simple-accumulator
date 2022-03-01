class SacThead {
    constructor(rowLength, columnLength) {
        this.thead = document.createElement('thead');

        /** @member {Array.<HTMLTableRowElement>} */
        this.rows = [];
        /** @member {Array.<Array.<HTMLTableCellElement>>} */
        this.cellsByRi = [];
        if (rowLength !== undefined)
            this._initRows(rowLength, columnLength);
    }

    getThead() {
        return this.thead;
    };

    forEachTd(ri, doForEach) {
        this.cellsByRi[ri].forEach(doForEach);
    }

    appendTr() {
        const tr = document.createElement('tr');
        this.rows.push(tr);
        this.thead.append(tr);
    }

    appendTd(ri) {
        const td = document.createElement('td');
        if (!this.cellsByRi[ri])
            this.cellsByRi[ri] = [];
        this.cellsByRi[ri].push(td);
        this.rows[ri].appendChild(td);
    }

    _initRows(rowLen, colLen) {
        for (let i = 0; i < rowLen; i++) {
            this.appendTr();
            for (let j = 0; j < colLen; j++)
                this.appendTd(i);
        }
    }
}

function createSacThead(rowLength, columnLength) {
    return new SacThead(rowLength, columnLength);
}
