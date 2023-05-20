
class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer
        this._contanerElement = document.querySelector(containerSelector)
    }
    renderItems(items) {
        items.forEach(item => this._renderer(item));
    }
    clear() {
        this._contanerElement.innerHTML = '';
    }
    addItem(element) {
        this._contanerElement.prepend(element);
    }
}

export { Section }