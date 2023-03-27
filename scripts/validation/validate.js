// Всё спер из Спринт 7/11: 6 спринт → Тема 5/9: Валидация форм → Урок 5/7

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  // errorElement.classList.add('form__input-error_active'); Не имеет смысла, так как если нет ошибки, то span пустой и его высота равна 0
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  // errorElement.classList.remove('form__input-error_active'); Не имеет смысла, так как если нет ошибки, то span пустой и его высота равна 0
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

const toggleButtonState = (inputList, buttonElement,inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false
  }
}

const setEventListeners = (formElement, componentSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(componentSelectors.inputSelector));
  const buttonElement = formElement.querySelector(componentSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement,componentSelectors.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, componentSelectors.inputErrorClass);
      toggleButtonState(inputList, buttonElement, componentSelectors.inactiveButtonClass);
    });
  });
}

const enableValidation = (componentSelectors) => {
  const formList = Array.from(document.querySelectorAll(componentSelectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, componentSelectors);
  })
}

export { enableValidation }