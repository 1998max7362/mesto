import { initialCards, componentSelectors } from "../utils/initials.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidation.js";
import '../../pages/index.css'; // добавьте импорт главного файла стилей

// ----------------------- Карточки
const imgPopup = new PopupWithImage('.popup_type_img', 'popup_opened', '.popup__close-button', '.img-container__img', '.img-container__caption')
const handleCardClick = imgPopup.open.bind(imgPopup)

const createCard = (placeName, sourceLink, templateSelector, handleCardClick) => {
    const card = new Card(placeName, sourceLink, templateSelector, handleCardClick)
    return card.createCardElement()
}

const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(createCard(item.name, item.link, '#element', handleCardClick));
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