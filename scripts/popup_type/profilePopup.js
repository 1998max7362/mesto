import {openPopup, closePopup} from "../popup.js"

const namePopup = document.querySelector('.popup_type_name-form');

const formElement = namePopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_el_first');
const jobInput = formElement.querySelector('.form__input_el_second');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const openNameFormPopup = () => {
  openPopup(namePopup)

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent

  formElement.addEventListener('submit', handleNameFormSubmit, { once: true });
}

const handleNameFormSubmit = (evt) =>{
  evt.preventDefault(); 
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(namePopup)
}

export {openNameFormPopup}