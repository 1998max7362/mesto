import { initialCards, componentSelectors } from "./initials.js";
import { addCard } from "./card.js";
import { FormPopup } from "./Popup.js";



// // Добавляем карточки при загрузке страницы
initialCards.forEach((card) => {

  addCard(card.name, card.link, '#element')
  // addCard('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg')
})

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formPopup = new FormPopup('.popup_type_profile','popup_opened')
editButton.addEventListener('click', () => formPopup.open())



