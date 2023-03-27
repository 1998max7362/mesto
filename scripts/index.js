import {openNameFormPopup} from "./popups/_type/profilePopup.js"
import {openCardFormPopup} from "./popups/_type/cardPopup.js"
import {closePopup} from "./popups/popup.js"

import {initialCards} from "./initials.js";
import { addCard } from "./element.js";


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


editButton.addEventListener('click', openNameFormPopup)
addButton.addEventListener('click', openCardFormPopup)

const popups = document.querySelectorAll('.popup')
popups.forEach((popup)=>{
  popup.querySelector('.popup__close-button').addEventListener('click', ()=>closePopup(popup))
})



initialCards.forEach((card)=>{
  addCard(card.name, card.link)
})



