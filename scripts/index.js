// Находим форму в DOM
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_job');
const closeButton = formElement.querySelector('.popup__close-button');
const saveButton = formElement.querySelector('.popup__save-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


const openPopup = ()=>{
    popup.classList.add('popup_opened')
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

const closePopup = ()=>{
    popup.classList.remove('popup_opened')
}

editButton.addEventListener('click',openPopup)
closeButton.addEventListener('click',closePopup)



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.


    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textConten
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 