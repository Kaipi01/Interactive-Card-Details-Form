const submitBtn = document.querySelector(".form__btn"),
  inputs = document.querySelectorAll("input"),
  inputOwnerName = document.querySelector("#card-name"),
  inputCardNumber = document.querySelector("#card-number"),
  inputCardExpMonth = document.querySelector("#card-exp-month"),
  inputCardExpYear = document.querySelector("#card-exp-year"),
  inputCardCVC = document.querySelector("#card-cvc"),
  cardOwnerName = document.querySelector(".card__front-name"),
  cardNumber = document.querySelector(".card__front-number"),
  cardExpMonth = document.querySelector(".card__front-date-exp-month"),
  cardExpYear = document.querySelector(".card__front-date-exp-year"),
  cardCVC = document.querySelector(".card__back-cvc"),
  owner = {
    input: inputOwnerName,
    card: cardOwnerName,
    placeholder: "JANE APPLESSED",
    inputMaxLength: 25,
  },
  number = {
    input: inputCardNumber,
    card: cardNumber,
    placeholder: "0000 0000 0000 0000",
    inputMaxLength: 16,
  },
  expMonth = {
    input: inputCardExpMonth,
    card: cardExpMonth,
    placeholder: "00",
    inputMaxLength: 2,
  },
  expYear = {
    input: inputCardExpYear,
    card: cardExpYear,
    placeholder: "00",
    inputMaxLength: 2,
  },
  cvc = {
    input: inputCardCVC,
    card: cardCVC,
    placeholder: "000",
    inputMaxLength: 3,
  },
  cardInfo = [owner, number, expMonth, expYear, cvc];

function validateForm() {
  formReset();

  if (
    isInputEmpty(inputOwnerName) ||
    isInputEmpty(inputCardNumber) ||
    isInputTypeNumber(inputCardNumber) ||
    isInputValueTooShort(inputCardNumber, 16) ||
    isInputEmpty(inputCardExpMonth) ||
    isInputEmpty(inputCardExpYear) ||
    isInputEmpty(inputCardCVC) ||
    isInputTypeNumber(inputCardCVC) ||
    isInputValueTooShort(inputCardCVC, 3)
  ) {
    return;
  }

  showCompleteSection();

  function isInputEmpty(input) {
    if (input.value === "") {
      showErrorMessage(input, input.nextElementSibling, "Can't be blank");
      return true;
    } else {
      return false;
    }
  }

  function isInputValueTooShort(input, requiredLength) {
    const arrayFromInput = Array.from(input.value);
    const isInputValueTooShort = arrayFromInput.length < requiredLength;
    if (isInputValueTooShort) {
      showErrorMessage(
        input,
        input.nextElementSibling,
        `Required length: ${requiredLength}!`
      );
      return true;
    } else {
      return false;
    }
  }

  function isInputTypeNumber(input) {
    const inputValue = Number(input.value);
    if (isNaN(inputValue)) {
      showErrorMessage(
        input,
        input.nextElementSibling,
        "Wrong format, numbers only"
      );
      return true;
    } else {
      return false;
    }
  }

  function showErrorMessage(input, pElement, message) {
    input.classList.add("form__input--error");
    showElement(pElement);
    pElement.textContent = message;
  }

  function formReset() {
    const errorMessages = document.querySelectorAll(".form__error");
    errorMessages.forEach((p) => hideElement(p));
    inputs.forEach((input) => input.classList.remove("form__input--error"));
  }
}

function displayCardInfoFromInput(info) {
  const { input, card, placeholder, inputMaxLength } = info,
    arrayFromInput = Array.from(input.value),
    isInputEmpty = input.value === "",
    isInputTooLong = arrayFromInput.length > inputMaxLength;

  if (isInputEmpty) {
    card.textContent = placeholder;
    return;
  } else if (isInputTooLong) {
    arrayFromInput.pop();
    input.value = arrayFromInput.join("");
  }
  card.textContent = input.value;
}

function addGapInCardNumber() {
  const arrayFromInput = Array.from(inputCardNumber.value);

  if (inputCardNumber.value === "") {
    cardNumber.textContent = "0000 0000 0000 0000";
    return;
  }

  for (let i = 0; i < arrayFromInput.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      arrayFromInput[i - 1] += " ";
    }
  }
  cardNumber.textContent = arrayFromInput.join("");
}

function addZeroBeforeNumber(input, cardExp) {
  if (input.value < 10 && input.value !== "") {
    cardExp.textContent = "0" + cardExp.textContent;
  }
}

function showCompleteSection() {
  const formSection = document.querySelector(".form");
  const completeSection = document.querySelector(".complete");
  hideElement(formSection);
  showElement(completeSection);
}

function showElement(element) {
  element.classList.remove(`${element.classList[0]}--hide`);
}

function hideElement(element) {
  element.classList.add(`${element.classList[0]}--hide`);
}

inputs.forEach((input, index) =>
  input.addEventListener("input", () =>
    displayCardInfoFromInput(cardInfo[index])
  )
);

submitBtn.addEventListener("click", validateForm);

inputCardNumber.addEventListener("input", addGapInCardNumber);

inputCardExpYear.addEventListener("input", () =>
  addZeroBeforeNumber(inputCardExpYear, cardExpYear)
);

inputCardExpMonth.addEventListener("input", () => {
  if (inputCardExpMonth.value > 12) {
    inputCardExpMonth.value = 12;
  } else if (inputCardExpMonth.value < 1) {
    inputCardExpMonth.value = "";
  }
  addZeroBeforeNumber(inputCardExpMonth, cardExpMonth);
});
