import {openNameFormPopup} from "./popup/profilePopup.js"
import {openCardFormPopup} from "./popup/cardPopup.js"

import {initialCards} from "./initials.js";
import { addCard } from "./element.js";


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


editButton.addEventListener('click', openNameFormPopup)
addButton.addEventListener('click', openCardFormPopup)


initialCards.forEach((card)=>{
  addCard(card.name, card.link)
})