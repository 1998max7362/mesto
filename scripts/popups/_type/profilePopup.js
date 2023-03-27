import {openPopup, closePopup} from "../popup.js"

const namePopup = document.querySelector('.popup_type_profile');

const formElement = namePopup.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_el_first');
const jobInput = formElement.querySelector('.form__input_el_second');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

const handleNameFormSubmit = (evt) =>{
  evt.preventDefault(); 
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(namePopup)
}

const openNameFormPopup = () => {
  openPopup(namePopup)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
}

formElement.addEventListener('submit', handleNameFormSubmit);

export {openNameFormPopup}
