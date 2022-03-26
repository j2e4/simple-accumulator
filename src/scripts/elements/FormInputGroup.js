class FormInputGroup {
    constructor(id) {
        /** @member {HTMLLabelElement} */
        this.$label = document.querySelector(`label[for=${id}]`)
            || document.createElement('label');
        /** @member {HTMLInputElement} */
        this.$input = document.querySelector(`input#${id}`)
            || document.createElement('input');

        // TODO createElement 했을 경우
    }

    get value() {
        return this.$input.value;
    }

    set label(text) {
        this.$label.innerHTML = text;
    }

    set placeholder(text) {
        this.$input.setAttribute('placeholder', text);
    }
}
