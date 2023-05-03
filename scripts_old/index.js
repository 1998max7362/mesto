import { initialCards, componentSelectors } from "./initials.js";
import { Card } from "./Card.js";
import { ProfileFormPopup, PlaceFormPopup } from "./Popup.js";
import { ImgPopup } from "./Popup.js"

const elements = document.querySelector('.elements')

const createCard = (placeName, sourceLink, templateSelector, handleCardClick) => {
  const card = new Card(placeName, sourceLink, templateSelector, handleCardClick)
  return card.createCardElement()
}

const addCard = (placeName, sourceLink, templateSelector, handleCardClick) => {
  elements.prepend(createCard(placeName, sourceLink, templateSelector, handleCardClick))
}

const imgPopup = new ImgPopup('.popup_type_img', 'popup_opened', '.img-container__img', '.img-container__caption')
const handleCardClick = imgPopup.open.bind(imgPopup)

// // Добавляем карточки при загрузке страницы
initialCards.forEach((card) => {
  addCard(card.name, card.link, '#element', handleCardClick)
})

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileFormPopup = new ProfileFormPopup('.popup_type_profile','popup_opened',componentSelectors, '.profile__name', '.profile__job' )
editButton.addEventListener('click', () => profileFormPopup.open())

const placeFormPopup = new PlaceFormPopup('.popup_type_card', 'popup_opened', componentSelectors, '#element', handleCardClick, addCard)
addButton.addEventListener('click', () => placeFormPopup.open())
