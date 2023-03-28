import {openPopup, closePopup, } from "../popup.js"
import { addCard } from "../../element.js";
import { disableButton, hideInputError } from "../../validation/validate.js";

const cardPopup = document.querySelector('.popup_type_card');

const formElement = cardPopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_el_first');
const sourceInput = formElement.querySelector('.form__input_el_second');
const button = formElement.querySelector('.form__save-button')


const openCardFormPopup = () => {
  openPopup(cardPopup)
  formElement.reset()
  //Приводим форму в правильное состояние
  hideInputError(formElement,nameInput,'form__input_novalid')
  hideInputError(formElement,sourceInput,'form__input_novalid')
  disableButton(button,'form__save-button_disabled')
}

const handleCardFormSubmit = () =>{
  addCard(nameInput.value, sourceInput.value)
  closePopup(cardPopup)
}

nameInput.addEventListener('keydown', evt => evt.key === 'Enter'? handleCardFormSubmit: false)
sourceInput.addEventListener('keydown', evt => evt.key === 'Enter'? handleCardFormSubmit: false)
formElement.addEventListener('submit', handleCardFormSubmit);

export { openCardFormPopup }