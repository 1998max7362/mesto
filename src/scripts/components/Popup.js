
class Popup {
  constructor(popupSelector, openPopupClassname, closeButtonSelector) {
    this._popupSelector = popupSelector
    this._openPopupClassname = openPopupClassname
    this._closeButtonSelector = closeButtonSelector
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

  _setEventListeners() {
    const closeButton = this._element.querySelector(this._closeButtonSelector)
    this._element.addEventListener('click', evt => {
      if (evt.target === this._element || evt.target === closeButton) this.close()
    })
  }
}

export {Popup}