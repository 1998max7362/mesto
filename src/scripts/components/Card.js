class Card {
  constructor(templateSelector, cardData, handleCardClick, handleAddLike, handleDeleteLike, handleDelete) {
    this._templateSelector = templateSelector
    this._element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    this._likeButton = this._element.querySelector('.element__like-button')
    this._likeCounter = this._element.querySelector('.element__like-counter')
    this._removeButton = this._element.querySelector('.element__remove-button')
    this._img = this._element.querySelector('.element__img')
    this._cardName = this._element.querySelector('.element__name')

    this._cardData = cardData
    this._handleCardClick = handleCardClick
    this._handleAddLike = handleAddLike
    this._handleDeleteLike = handleDeleteLike
    this._handleDelete = handleDelete


  }

  createCardElement() {
    this._cardName.textContent = this._cardData.name
    this._img.src = this._cardData.link
    this._img.alt = this._cardData.name
    this._setLikeCount(this._cardData.likes.length)

    this._setListeners()

    return this._element
  }

  setCardData(cardData) {
    this._cardData = cardData
  }

  getCardId() {
    return this._cardData._id
  }

  checkUsersRelation(userId) {
    this._checkHasUsersLike(userId)
    this._renderLike()
    this._showRemoveButton(this._checkIsUserCreated(userId))
  }

  _checkHasUsersLike(userId) {
    this._cardData.likes.some(user => user._id === userId)
      ? this._isLiked = true
      : this._isLiked = false
  }

  _checkIsUserCreated(userId) {
    console.log('userId',userId)
    return this._cardData.owner._id === userId ? true : false
  }

  _setListeners() {
    this._likeButton.addEventListener('click', () => this._like())
    this._removeButton.addEventListener('click', () => this._handleDelete())
    this._img.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link))
  }

  async _like() {
    if (this._isLiked) {
      await this._handleDeleteLike()
      this._setLikeCount()
      this._renderLike()
    } else {
      await this._handleAddLike()
      this._setLikeCount()
      this._renderLike()
    }
  }

  _setLikeCount() {
    this._likeCounter.textContent = this._cardData.likes.length
  }

  _renderLike() {
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_checked')
    } else {
      this._likeButton.classList.remove('element__like-button_checked')
    }
  }

  _showRemoveButton(bool) {
    if (!bool){
      this._removeButton.classList.add('element__remove-button_disabled')
    }
  }

  _remove() {
    this._element.remove()
  }
}



export { Card }
