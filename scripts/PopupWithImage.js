import { Popup } from "./Popup.js"

class PopupWithImage extends Popup {
  constructor(popupSelector, openPopupClassname, closeButtonSelector, imgContainerSelector, imgCaptionSelector) {
    super(popupSelector, openPopupClassname, closeButtonSelector)
    this._imgContainer = this._element.querySelector(imgContainerSelector)
    this._imgCaption = this._element.querySelector(imgCaptionSelector)
    super._setEventListeners()
  }

  open(placeName, sourceLink) {
    super.open()
    this._imgContainer.src = sourceLink
    this._imgContainer.alt = placeName
    this._imgCaption.textContent = placeName
  }
}

export { PopupWithImage }