
class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderer = renderer
        this._items = items
        this._contanerElement = document.querySelector(containerSelector)
    }
    renderItems() {
        this._items.array.forEach(item => this._renderer(item));
    }
    clear() {
        this._contanerElement.innerHTML = '';
    }
    addItem(element) {
        this._contanerElement.append(element);
    }
}