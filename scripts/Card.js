import { ImgPopup } from "./Popup.js"

const imgPopup = new ImgPopup('.popup_type_img', 'popup_opened', '.img-container__img', '.img-container__caption')
const elements = document.querySelector('.elements')

class Card {
  constructor(placeName, sourceLink, templateSelector) {
    this._templateSelector = templateSelector
    this._placeName = placeName
    this._sourceLink = sourceLink
    this._isLiked = false
  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  _setListeners() {
    const likeButton = this._element.querySelector('.element__like-button')
    likeButton.addEventListener('click', () => this._like(likeButton))
    this._element.querySelector('.element__remove-button').addEventListener('click', () => this._remove())
    this._element.querySelector('.element__img').addEventListener('click', ()=>imgPopup.open(this._placeName, this._sourceLink))
  }

  _like(likeButton) {
    this._isLiked = !this._isLiked
    this._isLiked ? likeButton.classList.add('element__like-button_checked') : likeButton.classList.remove('element__like-button_checked')
  }

  _remove() {
    this._element.remove()
  }

  createCardElement() {
    this._element = this._getTemplate()
    
    this._element.querySelector('.element__name').textContent = this._placeName
    const elementImg = this._element.querySelector('.element__img')
    elementImg.src = this._sourceLink
    elementImg.alt = this._placeName

    this._setListeners()
    return this._element
  }
}

const addCard = (placeName, sourceLink, templateSelector) => {
  const card = new Card(placeName, sourceLink, templateSelector)
  const cardElement = card.createCardElement()
  elements.prepend(cardElement)
}


export { addCard }
