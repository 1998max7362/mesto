import {openPopup, closePopup } from "../popup.js"
import { addCard } from "../element.js";

const cardPopup = document.querySelector('.popup__card-form');

const formElement = cardPopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_el_first');
const sourceInput = formElement.querySelector('.form__input_el_second');

const openCardFormPopup = () => {
  openPopup(cardPopup)

  nameInput.value = ''
  sourceInput.value = ''

  formElement.addEventListener('submit', handleCardFormSubmit, { once: true });
}

const handleCardFormSubmit = (evt) =>{
  evt.preventDefault(); 
  addCard(nameInput.value, sourceInput.value)
  closePopup(cardPopup)
}
export { openCardFormPopup }