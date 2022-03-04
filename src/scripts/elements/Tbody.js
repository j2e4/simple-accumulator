class SacTbody extends SacTableElement {
    /**
     * @param {number} [rowLength]
     * @param {number} [columnLength]
     */
    constructor(rowLength, columnLength) {
        super();
        this.tbody = document.createElement('tbody');
        this._init(rowLength, columnLength);
    }

    getTbody() {
        return this.tbody;
    };

    appendTr() {
        super.appendTr();
        this.tbody.append(this.rows[this.rows.length - 1]);
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

function createSacTbody(rowLength, columnLength) {
    return new SacTbody(rowLength, columnLength);
}
