import {closePopup, openNameFormPopup, openCardFormPopup} from "./popup.js";
import {initialCards} from "./initials.js";
import { addCard } from "./element.js";

const closeButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


editButton.addEventListener('click', openNameFormPopup)
addButton.addEventListener('click', openCardFormPopup)
closeButton.addEventListener('click', closePopup)

initialCards.forEach((card)=>{
  addCard(card.name, card.link)
})