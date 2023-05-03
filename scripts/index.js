import { initialCards, componentSelectors } from "./initials.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { FormValidator } from "./FormValidation.js";

// ----------------------- Карточки
const imgPopup = new PopupWithImage('.popup_type_img', 'popup_opened', '.popup__close-button', '.img-container__img', '.img-container__caption')
const handleCardClick = imgPopup.open.bind(imgPopup)

const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item.name, item.link, '#element', handleCardClick)
            const cardElement = card.createCardElement();
            cardList.addItem(cardElement);
        }
    },
    '.elements')

cardList.renderItems()

// -------------------Профиль
const profileNameContainer = document.querySelector('.profile__name')
const profileJobContainer = document.querySelector('.profile__job')

const userInfo = new UserInfo(profileNameContainer, profileJobContainer)

// ------------------------Place Validation
const placeForm = document.querySelector('#place')
const placeValidator = new FormValidator(componentSelectors, placeForm)
placeValidator.enableValidation()

// ------------------------Profile Validation
const profileForm = document.querySelector('#name-job')
const profileValidator = new FormValidator(componentSelectors, profileForm)
profileValidator.enableValidation()

// -----------------------Profile popup
const editButton = document.querySelector('.profile__edit-button');

const profileFormPopup = new PopupWithForm(
    '.popup_type_profile',
    'popup_opened',
    '.popup__close-button',
    () => {
        userInfo.setUserInfo(profileFormPopup._getInputValues())
        profileFormPopup.close()
    },
    componentSelectors,
    () => {
        profileFormPopup._inputList.forEach((inputElement, id) => {
            inputElement.value = userInfo.getUserInfo()[id]
            profileValidator._checkInputValidity(inputElement)
            profileValidator._toggleButtonState()
        })
    })

editButton.addEventListener('click', () => profileFormPopup.open())

// ------------------------ Card popup
const addButton = document.querySelector('.profile__add-button');

const placeFormPopup = new PopupWithForm(
    '.popup_type_card',
    'popup_opened',
    '.popup__close-button',
    () => {
        const [name, link] = placeFormPopup._getInputValues()
        const card = new Card(name, link, '#element', handleCardClick)
        const cardElement = card.createCardElement();
        cardList.addItem(cardElement);
        placeFormPopup.close()
    },
    componentSelectors,
    () => {
        placeValidator.disableButton()
    })

editButton.addEventListener('click', () => profileFormPopup.open())

addButton.addEventListener('click', () => placeFormPopup.open())