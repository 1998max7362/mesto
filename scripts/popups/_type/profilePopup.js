import {openPopup, closePopup} from "../popup.js"

const namePopup = document.querySelector('.popup_type_profile');

const formElement = namePopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_el_first');
const jobInput = formElement.querySelector('.form__input_el_second');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputEvent = new Event('input')

const openNameFormPopup = () => {
  openPopup(namePopup)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
  nameInput.dispatchEvent(inputEvent)
  jobInput.dispatchEvent(inputEvent)
}

const handleNameFormSubmit = (evt) =>{
  evt.preventDefault(); 
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(namePopup)
}



formElement.addEventListener('submit', handleNameFormSubmit);

export {openNameFormPopup}
