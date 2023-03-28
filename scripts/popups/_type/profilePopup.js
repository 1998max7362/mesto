import {openPopup, closePopup } from "../popup.js"
import { enableButton, hideInputError } from "../../validation/validate.js";

const namePopup = document.querySelector('.popup_type_profile');

const profileFormElement = namePopup.querySelector('.form');
const nameInput = profileFormElement.querySelector('.form__input_el_first');
const jobInput = profileFormElement.querySelector('.form__input_el_second');
const profileFormSubmitButton = profileFormElement.querySelector('.form__save-button')

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const openNameFormPopup = () => {
  openPopup(namePopup)
  //Приводим форму в правильное состояние
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  hideInputError(profileFormElement,nameInput,'form__input_novalid')
  hideInputError(profileFormElement,jobInput,'form__input_novalid')
  enableButton(profileFormSubmitButton,'form__save-button_disabled')
}

const handleNameFormSubmit = () =>{
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(namePopup)
}

nameInput.addEventListener('keydown', evt => evt.key === 'Enter'? handleNameFormSubmit: false)
jobInput.addEventListener('keydown', evt => evt.key === 'Enter'? handleNameFormSubmit: false)
profileFormElement.addEventListener('submit', handleNameFormSubmit);

export {openNameFormPopup}
