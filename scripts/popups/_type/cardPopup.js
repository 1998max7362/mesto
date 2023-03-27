import {openPopup, closePopup } from "../popup.js"
import { addCard } from "../../element.js";

const cardPopup = document.querySelector('.popup_type_card');

const formElement = cardPopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_el_first');
const sourceInput = formElement.querySelector('.form__input_el_second');

const openCardFormPopup = () => {
  openPopup(cardPopup)
  formElement.reset()
}

const handleCardFormSubmit = (evt) =>{
  evt.preventDefault(); 
  addCard(nameInput.value, sourceInput.value)
  closePopup(cardPopup)
}

formElement.addEventListener('submit', handleCardFormSubmit);

export { openCardFormPopup }