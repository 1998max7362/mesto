import { Popup } from "./Popup"

class ImgPopup extends Popup {
  constructor(popupSelector, openPopupClassname, imgContainerSelector, imgCaptionSelector) {
    super(popupSelector, openPopupClassname)
    this._imgContainer = this._element.querySelector(imgContainerSelector)
    this._imgCaption = this._element.querySelector(imgCaptionSelector)
    super._setListeners()
  }

  open(placeName, sourceLink) {
    super.open()
    this._imgContainer.src = sourceLink
    this._imgContainer.alt = placeName
    this._imgCaption.textContent = placeName
  }
}