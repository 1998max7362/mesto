import { FormValidator } from "./Validation.js"
import { addCard } from "./card.js";
class Popup {
  constructor(popupSelector, openPopupClassname) {
    this._popupSelector = popupSelector
    this._openPopupClassname = openPopupClassname
    this._element = document.querySelector(popupSelector)
    this._closeByKeyBinded = this._closeByKey.bind(this)
  }
  open() {
    this._element.classList.add(this._openPopupClassname)
    document.addEventListener('keydown', this._closeByKeyBinded)
  }

  close() {
    this._element.classList.remove(this._openPopupClassname)
    document.removeEventListener('keydown', this._closeByKeyBinded)
  }

  _closeByKey(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _setListeners() {
    const closeButton = this._element.querySelector('.popup__close-button')
    this._element.addEventListener('click', evt => {
      (evt.target === this._element || evt.target === closeButton) ? this.close() : false
    })
  }
}

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
    this.formValidator.setListeners()
    this._form.addEventListener('submit', evt => evt.preventDefault())
    this._inputList.forEach(input => input.addEventListener('keydown', (evt) => {
      evt.key === 'Enter' ? this._handleSubmit : false
    }))
    this._form.addEventListener('submit', () => this._handleSubmit())
  }
}


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
  constructor(popupSelector, openPopupClassname, componentSelectors, cardTemplateSelector) {
    super(popupSelector, openPopupClassname, componentSelectors)
    this._cardTemplateSelector = cardTemplateSelector
  }

  _handleSubmit() {
    addCard(this._inputList[0].value, this._inputList[1].value, this._cardTemplateSelector)
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


class ImgPopup extends Popup {
  constructor(popupSelector, openPopupClassname, imgContainerSelector, imgCaptionSelector) {
    super(popupSelector, openPopupClassname)
    this._imgContainer = this._element.querySelector(imgContainerSelector)
    this._imgCaption = this._element.querySelector(imgCaptionSelector)
    super._setListeners()
  }

  open(placeName, sourceLink){
    super.open()
    this._imgContainer.src = sourceLink
    this._imgContainer.alt = placeName
    this._imgCaption.textContent = placeName
  }
}

export { ProfileFormPopup, PlaceFormPopup, ImgPopup }