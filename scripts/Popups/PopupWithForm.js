import { Popup } from "./Popup"

class FormPopup extends Popup {
  constructor(popupSelector, openPopupClassname, componentSelectors) {
    super(popupSelector, openPopupClassname)
    this._form = this._element.querySelector(componentSelectors.formSelector)
    this._inputList = Array.from(this._form.querySelectorAll(componentSelectors.inputSelector))
    this.formValidator = new FormValidator(componentSelectors, this._form)
    this._setListeners()
  }

  _handleSubmit() {
    console.log('submit')
  }

  _setListeners() {
    super._setListeners()
    this.formValidator.enableValidation()
    this._form.addEventListener('submit', evt => evt.preventDefault())
    this._form.addEventListener('submit', () => this._handleSubmit())
  }
}