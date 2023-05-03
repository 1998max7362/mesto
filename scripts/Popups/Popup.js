import { FormValidator } from "../FormValidation.js"

class Popup {
  constructor(popupSelector, openPopupClassname, popupCloseButtonSelector) {
    this._popupSelector = popupSelector
    this._openPopupClassname = openPopupClassname
    this._popupCloseButtonSelector = popupCloseButtonSelector
    this._element = document.querySelector(popupSelector)
    this._handleEscCloseBinded = this._handleEscClose.bind(this)
  }
  open() {
    this._element.classList.add(this._openPopupClassname)
    document.addEventListener('keydown', this._handleEscCloseBinded)
  }

  close() {
    this._element.classList.remove(this._openPopupClassname)
    document.removeEventListener('keydown', this._handleEscCloseBinded)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    const closeButton = this._element.querySelector(this._popupCloseButtonSelector)
    this._element.addEventListener('click', evt => {
      (evt.target === this._element || evt.target === closeButton) ? this.close() : false
    })
  }
}






// -----------------------------------------------------------------------------------------------------------------

class ProfileFormPopup extends FormPopup {
  constructor(popupSelector, openPopupClassname, componentSelectors, profileNameSelector, profileJobSelector) {
    super(popupSelector, openPopupClassname, componentSelectors)
    this._profileName = document.querySelector(profileNameSelector)
    this._profileJob = document.querySelector(profileJobSelector)
  }

  _handleSubmit() {
    this._profileName.textContent = this._inputList[0].value
    this._profileJob.textContent = this._inputList[1].value
    super.close()
  }

  open() {
    super.open()
    this._inputList[0].value = this._profileName.textContent
    this._inputList[1].value = this._profileJob.textContent
    this.formValidator.hideInputError(this._inputList[0])
    this.formValidator.hideInputError(this._inputList[1])
    this.formValidator.enableButton()
  }
}


class PlaceFormPopup extends FormPopup {
  constructor(popupSelector, openPopupClassname, componentSelectors, cardTemplateSelector, handleCardClick, addCard) {
    super(popupSelector, openPopupClassname, componentSelectors)
    this._cardTemplateSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick 
    this._addCard = addCard
  }

  _handleSubmit() {
    this._addCard(this._inputList[0].value, this._inputList[1].value, this._cardTemplateSelector, this._handleCardClick)
    super.close()
  }

  open() {
    super.open()
    this._form.reset()
    this.formValidator.hideInputError(this._inputList[0])
    this.formValidator.hideInputError(this._inputList[1])
    this.formValidator.disableButton()
  }
}



export { ProfileFormPopup, PlaceFormPopup, ImgPopup, Popup }