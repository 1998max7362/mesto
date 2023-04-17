import { initialCards, componentSelectors } from "./initials.js";
import { addCard } from "./card.js";
import { ProfileFormPopup, PlaceFormPopup } from "./Popup.js";



// // Добавляем карточки при загрузке страницы
initialCards.forEach((card) => {
  addCard(card.name, card.link, '#element')
})

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileFormPopup = new ProfileFormPopup('.popup_type_profile','popup_opened',componentSelectors, '.profile__name', '.profile__job' )
editButton.addEventListener('click', () => profileFormPopup.open())

const placeFormPopup = new PlaceFormPopup('.popup_type_card', 'popup_opened', componentSelectors, '#element')
addButton.addEventListener('click', () => placeFormPopup.open())
