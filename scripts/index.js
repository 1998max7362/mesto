import {openNameFormPopup} from "./popups/_type/profilePopup.js"
import {openCardFormPopup} from "./popups/_type/cardPopup.js"
import {closePopup} from "./popups/popup.js"
import {enableValidation} from "./validation/validate.js"

import {initialCards, componentSelectors} from "./initials.js";
import { addCard } from "./element.js";


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


editButton.addEventListener('click', openNameFormPopup)
addButton.addEventListener('click', openCardFormPopup)

// Назначаем закрытие попапа при нажатии на кнопку или фон
const popups = document.querySelectorAll('.popup')
popups.forEach((popup)=>{
  const closeButton = popup.querySelector('.popup__close-button')
  popup.addEventListener('click', evt => (evt.target === popup || evt.target === closeButton)? closePopup(popup): false)
})

// Добавляем карточки при загрузке страницы
initialCards.forEach((card)=>{
  addCard(card.name, card.link)
})

// Включаем валидацию
enableValidation(componentSelectors)


