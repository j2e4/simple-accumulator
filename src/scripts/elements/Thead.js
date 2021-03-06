class SacThead extends SacTableElement {
    /**
     * @param {number} [rowLength]
     * @param {number} [columnLength]
     */
    constructor(rowLength, columnLength) {
        super();
        this.thead = document.createElement('thead');
        this._init(rowLength, columnLength);
    }

    getThead() {
        return this.thead;
    };

    appendTr() {
        super.appendTr();
        this.thead.append(this.rows[this.rows.length - 1]);
    }

    _init(rowLen, colLen) {
        if (!rowLen)
            return;

        for (let ri = 0; ri < rowLen; ri++) {
            this.appendTr();
            for (let ci = 0; ci < colLen; ci++)
                this.appendTd(ri);
        }
    }
}

function createSacThead(rowLength, columnLength) {
    return new SacThead(rowLength, columnLength);
}
