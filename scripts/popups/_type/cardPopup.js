import {openPopup, closePopup, } from "../popup.js"
import { addCard } from "../../element.js";
import { disableButton, hideInputError } from "../../validation/validate.js";

const cardPopup = document.querySelector('.popup_type_card');

const cardFormElement = cardPopup.querySelector('.form');
const nameInput = cardFormElement.querySelector('.form__input_el_first');
const sourceInput = cardFormElement.querySelector('.form__input_el_second');
const cardFormSubmitButton = cardFormElement.querySelector('.form__save-button')


const openCardFormPopup = () => {
  openPopup(cardPopup)
  cardFormElement.reset()
  //Приводим форму в правильное состояние
  hideInputError(cardFormElement,nameInput,'form__input_novalid')
  hideInputError(cardFormElement,sourceInput,'form__input_novalid')
  disableButton(cardFormSubmitButton,'form__save-button_disabled')
}

const handleCardFormSubmit = () =>{
  addCard(nameInput.value, sourceInput.value)
  closePopup(cardPopup)
}

nameInput.addEventListener('keydown', evt => evt.key === 'Enter'? handleCardFormSubmit: false)
sourceInput.addEventListener('keydown', evt => evt.key === 'Enter'? handleCardFormSubmit: false)
cardFormElement.addEventListener('submit', handleCardFormSubmit);

export { openCardFormPopup }