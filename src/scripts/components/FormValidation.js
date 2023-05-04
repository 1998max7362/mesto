

class FormValidator {
  constructor(componentSelectors, form) {
    this._form = form
    this._inactiveButtonClass = componentSelectors.inactiveButtonClass
    this._inputErrorClass = componentSelectors.inputErrorClass

    this._inputList = Array.from(form.querySelectorAll(componentSelectors.inputSelector))
    this._submitButton = form.querySelector(componentSelectors.submitButtonSelector)
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton(this._submitButton, this._inactiveButtonClass)
    } else {
      this.enableButton(this._submitButton, this._inactiveButtonClass)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };


  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false
  }

  enableValidation() {
    this._form.addEventListener('reset', ()=>{
      this._inputList.forEach(inputElement => this.hideInputError(inputElement))
    })
    this.toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
}

export { FormValidator }