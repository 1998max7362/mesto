// Всё спер из Спринт 7/11: 6 спринт → Тема 5/9: Валидация форм → Урок 5/7

const showInputError = (formElement, inputElement, errorMessage, componentSelectors) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add(componentSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  // errorElement.classList.add('form__input-error_active'); Не имеет смысла, так как если нет ошибки, то span пустой и его высота равна 0
};

const hideInputError = (formElement, inputElement, componentSelectors) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove(componentSelectors.inputErrorClass);
  // errorElement.classList.remove('form__input-error_active'); Не имеет смысла, так как если нет ошибки, то span пустой и его высота равна 0
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, componentSelectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, componentSelectors);
    // formElement.addEventListener('submit', handleNameFormSubmit);
  } else {
    hideInputError(formElement, inputElement, componentSelectors);
    // formElement.removeEventListener('submit', handleNameFormSubmit);
  }
};

const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

const toggleButtonState = (inputList, buttonElement,componentSelectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(componentSelectors.inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(componentSelectors.inactiveButtonClass);
    buttonElement.disabled = false
  }
}

const setEventListeners = (formElement, componentSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(componentSelectors.inputSelector));
  const buttonElement = formElement.querySelector(componentSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement,componentSelectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, componentSelectors);
      toggleButtonState(inputList, buttonElement,componentSelectors);
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