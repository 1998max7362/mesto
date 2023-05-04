import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, openPopupClassname, closeButtonSelector, handleSubmit, {formSelector, inputSelector}, onOpen) {
    super(popupSelector, openPopupClassname, closeButtonSelector)
    this._handleSubmit = handleSubmit
    this._form = this._element.querySelector(formSelector)
    this.inputList = Array.from(this._form.querySelectorAll(inputSelector))
    this._onOpen = onOpen
    this._setEventListeners() 
  }

  open() {
    super.open()
    this._onOpen()
  }

  close(){
    super.close()
    this._form.reset()
  }

  getInputValues() {
    return this.inputList.map(input => input.value)
  }

  _setEventListeners() {
    super._setEventListeners()
    this._form.addEventListener('submit', evt => evt.preventDefault())
    this._form.addEventListener('submit', () => this._handleSubmit())
  }
}