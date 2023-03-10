import { profileFormAttrs, cardFormAttrs} from "./initials.js";
import { addCard } from "./element.js";


const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');

const wideImgElement = document.querySelector('.img-container');
const wideImg =  wideImgElement.querySelector('.img-container__img')
const captionImg =  wideImgElement.querySelector('.img-container__caption')

const formElement = popupContainer.querySelector('.form');
const popupName = formElement.querySelector('.form__name')
const firstInput = formElement.querySelector('.form__input_el_first');
const secondInput = formElement.querySelector('.form__input_el_second');
const saveButton = formElement.querySelector('.form__save-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const closePopup = () => {
  popup.classList.remove('popup_opened')
  formElement.classList.remove('form_opened')
  wideImgElement.classList.remove('img-container_opened')
}

const openNameFormPopup = () => {
  popup.classList.add('popup_opened')
  formElement.classList.add('form_opened')
  popupName.textContent = profileFormAttrs.form_name
  firstInput.placeholder = profileFormAttrs.first_input
  secondInput.placeholder = profileFormAttrs.second_input
  firstInput.value = profileName.textContent
  secondInput.value = profileJob.textContent
  saveButton.textContent = profileFormAttrs.submit

  formElement.addEventListener('submit', handleNameFormSubmit, {once: true}); 
}

const handleNameFormSubmit = (evt) =>{
  evt.preventDefault(); 
  profileName.textContent = firstInput.value
  profileJob.textContent = secondInput.value
  closePopup()
}

const openCardFormPopup = () => {
  popup.classList.add('popup_opened')
  formElement.classList.add('form_opened')
  popupName.textContent = cardFormAttrs.form_name
  firstInput.placeholder = cardFormAttrs.first_input
  secondInput.placeholder = cardFormAttrs.second_input
  firstInput.value = ''
  secondInput.value = ''
  saveButton.textContent = cardFormAttrs.submit

  formElement.addEventListener('submit', handleCardFormSubmit, {once: true}); 
}

const handleCardFormSubmit = (evt) =>{
  evt.preventDefault(); 
  addCard(firstInput.value, secondInput.value)
  closePopup()
}

const openWidePic = (placeName, sourceLink)=>{
  popup.classList.add('popup_opened')
  wideImgElement.classList.add('img-container_opened')
  wideImg.src = sourceLink
  wideImg.alt = placeName
  captionImg.textContent = placeName
}


export {closePopup, openNameFormPopup, openCardFormPopup, openWidePic}