import { componentSelectors, url, token } from "../utils/initials.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidation.js";
import { Api } from "../components/APi.js";
import '../../pages/index.css'; // добавьте импорт главного файла стилей

// ------------------------API
const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

const initialCards = api.getInitialCards()
const userData = api.getUserData()

// ----------------------- Image Popup 
const imgPopup = new PopupWithImage('.popup_type_img', 'popup_opened', '.popup__close-button', '.img-container__img', '.img-container__caption')
const handleCardClick = imgPopup.open.bind(imgPopup)


// ----------------------- Cards 
const createCard = (cardInfo, templateSelector, handleCardClick) => {
  const card = new Card(cardInfo, templateSelector, handleCardClick)
  return card.createCardElement()
}

const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      cardList.addItem(createCard(item, '#element', handleCardClick));
    }
  },
  '.elements')


// -------------------User Profile
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar')

// ------------------------Place Validation
const placeForm = document.querySelector('#place')
const placeValidator = new FormValidator(componentSelectors, placeForm)
placeValidator.enableValidation()

// ------------------------Profile Validation
const profileForm = document.querySelector('#name-job')
const profileValidator = new FormValidator(componentSelectors, profileForm)
profileValidator.enableValidation()

// ------------------------ Loading Button state
const setSubmitButtonCommon = (formValidatior) =>{
  formValidatior.submitButton.textContent = 'Сохраненить'
  formValidatior.enableButton()
}

const setSubmitButtonLoading = (formValidatior) =>{
  formValidatior.submitButton.textContent = 'Сохранение...'
  formValidatior.disableButton()
}

// -----------------------Profile popup
const editButton = document.querySelector('.profile__edit-button');

const profileFormPopup = new PopupWithForm(
  '.popup_type_profile',
  'popup_opened',
  '.popup__close-button',
  componentSelectors,
  async () => {
    setSubmitButtonLoading(profileValidator)
    try{
      userInfo.setUserInfo(await api.patchUserData(profileFormPopup.getInputValues()))
      profileFormPopup.close()
    }
    catch{
      console.log('Не удалось изменить данные профиля')
    }
    setSubmitButtonCommon(profileValidator)
  },
  () => {
    profileFormPopup.inputList.forEach((inputElement, id) => {
      inputElement.value = userInfo.getUserInfo()[id]
      profileValidator.checkInputValidity(inputElement)
      profileValidator.toggleButtonState()
    })
  })

editButton.addEventListener('click', () => profileFormPopup.open())

// ------------------------ Card popup
const addButton = document.querySelector('.profile__add-button');
const placeFormPopup = new PopupWithForm(
  '.popup_type_card',
  'popup_opened',
  '.popup__close-button',
  componentSelectors,
  () => {
    const [name, link] = placeFormPopup.getInputValues()
    cardList.addItem(createCard(name, link, '#element', handleCardClick));
    placeFormPopup.close()
  },
  () => {
    placeValidator.disableButton()
  })

addButton.addEventListener('click', () => placeFormPopup.open())



// --------------------- Page init with server data
Promise.all([initialCards, userData]).then(([initialCards, userData]) => {

  // ---------Профиль (заполнение данных юзера)
  userInfo.setUserAvatar(userData.avatar)
  userInfo.setUserInfo(userData)
  // ---------Карточки и попап картинки (рендер)
  cardList.setItems(initialCards)
  cardList.renderItems()
}
)