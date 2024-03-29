import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, openPopupClassname, closeButtonSelector, {formSelector, inputSelector}, handleSubmit, onOpen = ()=>{}) {
    super(popupSelector, openPopupClassname, closeButtonSelector)
    this.handleSubmit = handleSubmit
    this._form = this._element.querySelector(formSelector)
    this.inputList = Array.from(this._form.querySelectorAll(inputSelector))
    this._onOpen = onOpen
    this._setEventListeners() 
  }

  open(props = {}) {
    super.open()
    this._onOpen(props)
  }

  close(){
    super.close()
    this._form.reset()
  }

  getInputValues() {
    return this.inputList.reduce((obj, input) => ({ ...obj, [input.name]: input.value}), {}) 
  }

  _setEventListeners() {
    super._setEventListeners()
    this._form.addEventListener('submit', evt => evt.preventDefault())
    this._form.addEventListener('submit', () => this.handleSubmit())
  }
}