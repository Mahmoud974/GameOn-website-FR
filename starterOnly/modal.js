/**
 * Active the burger menu
 */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");
const closeConfirm = document.querySelector(".closeConfirm");
const bground = document.querySelector(".bground");
const sendForm = document.querySelector(".sendForm");
const form = document.querySelector("form");
/**
 * launch modal event
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * launch modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Close the modal send form
 */
close.addEventListener("click", () => {
  bground.style.display = "none";
});
/**
 * Button close the modal send form
 */
btnClose.addEventListener("click", () => {
  sendForm.style.display = "none";
});

/**
 * Close the modal send form
 */
closeConfirm.addEventListener("click", () => {
  sendForm.style.display = "none";
});

/**
 *  Validate name and firstname
 * @param {*} input
 * @param {*} errorMsg
 * @returns
 */
const validateName = (input) => {
  const regex = /^[a-zA-ZÀ-ÿ\s']+$/;
  let fieldValue = input.value.trim();
  const formData = input.closest(".formData"); // Récupérer l'élément parent .formData

  if (fieldValue === "") {
    formData.setAttribute("data-error-visible", "true"); // Définir l'attribut data-error-visible sur "true"
    return false;
  } else if (fieldValue.length < 2) {
    formData.setAttribute("data-error-visible", "true");
    return false;
  } else if (!regex.test(fieldValue)) {
    formData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    formData.removeAttribute("data-error-visible"); // Supprimer l'attribut data-error-visible
    return true;
  }
};

/**
 * Check a field empty for email and birthdate
 * @param {*} input
 * @param {*} errorMsg
 * @returns
 */
const validateInput = (input) => {
  const formData = input.closest(".formData");
  if (input.id === "email" || input.id === "birthdate") {
    let fieldValue = input.value.trim();
    if (fieldValue === "") {
      formData.setAttribute("data-error-visible", "true"); // Définir l'attribut data-error-visible sur "true"
      return false;
    } else if (input.id === "email") {
      // Check the email format with regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fieldValue)) {
        formData.setAttribute("data-error-visible", "true");
        return false;
      } else {
        formData.removeAttribute("data-error-visible");
        return true;
      }
    } else if (input.id === "birthdate") {
      const birthDate = new Date(fieldValue);
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 14,
        today.getMonth(),
        today.getDate()
      ); // 14 ans moins un jour
      if (birthDate >= minDate) {
        formData.setAttribute("data-error-visible", "true");
        return false;
      } else {
        formData.removeAttribute("data-error-visible");
        return true;
      }
    }
  } else {
    return validateName(input);
  }
};

/**
 * Check the quantity of game
 * @returns
 */
const checkQuantity = (input) => {
  const quantityInput = document.getElementById("quantity");
  const formData = input.closest(".formData");
  //input value is empty or negative
  if (quantityInput.value === "" || quantityInput.value === "-0") {
    formData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    formData.removeAttribute("data-error-visible");
    return true;
  }
};

/**
 * Check the case the condition
 * @param {*} checkbox
 * @param {*} errorMsg
 * @returns
 */
const validateCheckbox = (checkbox) => {
  const formData = checkbox1.closest(".formData");
  if (!checkbox.checked) {
    formData.setAttribute("data-error-visible", "true");
    return false;
  } else {
    formData.removeAttribute("data-error-visible");
    return true;
  }
};

/**
 *  Display the cities selects
 * @param {*} errorMsg
 * @returns
 */

const validateCity = () => {
  const checkedRadio = document.querySelector('input[name="location"]:checked');

  if (!checkedRadio) {
    const radioButtons = document.querySelectorAll('input[name="location"]');
    radioButtons.forEach((radioButton) => {
      const formData = radioButton.closest(".formData");
      if (formData) {
        formData.setAttribute("data-error-visible", "true");
      }
    });
    return false;
  } else {
    const formData = location1.closest(".formData");
    formData.removeAttribute("data-error-visible");

    return true;
  }
};

/**
 * Send the form with the variable
 * @returns
 */
const validate = () => {
  const isFirstNameValid = validateInput(first);
  const isLastNameValid = validateInput(last);
  const isEmailValid = validateInput(email);
  const isBirthdateValid = validateInput(birthdate);
  const isCheckboxValid = validateCheckbox(checkbox1);
  const isLocationValid = validateCity();
  const isCheckQuantity = checkQuantity(quantity);

  return (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isBirthdateValid &&
    isCheckboxValid &&
    isLocationValid &&
    isCheckQuantity
  );
};

/**
 * Send the form with the button submit
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelectorAll("input");
  if (validate()) {
    bground.style.display = "none";
    sendForm.style.display = "flex";
    input.forEach((input) => (input.value = ""));
  }
});
