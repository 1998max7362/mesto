class Card {
  constructor(cardData, templateSelector, handleCardClick, userId) {
    this._templateSelector = templateSelector
    this._element = this._getTemplate()
    this._likeButton = this._element.querySelector('.element__like-button')
    this._likeCounter = this._element.querySelector('.element__like-counter')
    this._removeButton = this._element.querySelector('.element__remove-button')
    this._img = this._element.querySelector('.element__img')
    this._cardName = this._element.querySelector('.element__name')

    this._userId = userId

    this.cardData = cardData
    this.cardData._isLiked = cardData.likes.some(userData._id === this._userId)

    this._placeName = name
    this._sourceLink = link
    this._likeNum = likes.lenght
    this._isLiked = false

    {

    }

    this._handleCardClick = handleCardClick
  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }

  _setListeners() {
    this._likeButton.addEventListener('click', () => this._like())
    this._removeButton.addEventListener('click', () => this._remove())

    this._img.addEventListener('click', () => this._handleCardClick(this._placeName, this._sourceLink))
  }

  _like() {
    this._isLiked = !this._isLiked
    this._isLiked ? this._likeButton.classList.add('element__like-button_checked') : this._likeButton.classList.remove('element__like-button_checked')
  }

  _remove() {
    this._element.remove()
  }

  _setLikeNum(likeCount) {
    this._likeCounter.textContent = likeCount
  }

  createCardElement() {
    this._cardName.textContent = this._placeName

    this._img.src = this._sourceLink
    this._img.alt = this._placeName
    this._setLikeNum = this._likeNum
    this._setListeners()

    return this._element
  }
}



export { Card }
