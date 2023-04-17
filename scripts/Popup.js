class Popup {
  constructor(popupSelector, openPopupClassname) {
    this._popupSelector = popupSelector
    this._openPopupClassname = openPopupClassname
    this._element = document.querySelector(popupSelector)
    this._setListeners()
    this._closeByKeyBinded = this._closeByKey.bind(this)
  }
  open() {
    this._element.classList.add(this._openPopupClassname)
    document.addEventListener('keydown', this._closeByKeyBinded)
    console.log('open')
  }

  close() {
    this._element.classList.remove(this._openPopupClassname)
    document.removeEventListener('keydown',  this._closeByKeyBinded)
    console.log('close')
  }

  _closeByKey(evt) {
    if (evt.key === 'Escape'){
      this.close()
    }
  }

  _setListeners() {
    const closeButton = this._element.querySelector('.popup__close-button')
    this._element.addEventListener('click', evt => (evt.target === this._element || evt.target === closeButton)? this.close(): false)
  }
}

class FormPopup extends Popup {
  constructor(popupSelector, openPopupClassname) {
    super(popupSelector, openPopupClassname)
    this._form = this._element.querySelector('.form')
    this._nameInput = this._element.querySelector('.form__input_el_first');
    this._jobInput = this._element.querySelector('.form__input_el_first');
  }

  open(){
    super.open()
    
  }


}

export {FormPopup}