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
const validateName = (input, errorMsg) => {
  const regex = /^[a-zA-ZÀ-ÿ\s']+$/;
  //Delete the space in my input
  let fieldValue = input.value.trim();
  if (fieldValue === "") {
    errorMsg.textContent = "Ce champ est obligatoire.";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "12px";
    return false;
  } else if (fieldValue.length < 2) {
    errorMsg.textContent =
      "Le prénom ou le nom doit contenir au moins deux lettres.";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "12px";
    return false;
  } else if (!regex.test(fieldValue)) {
    errorMsg.textContent = "Veuillez entrer un prénom ou un nom valide.";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "12px";
    return false;
  } else {
    errorMsg.textContent = "";
    return true;
  }
};

/**
 * Check a field empty
 * @param {*} input
 * @param {*} errorMsg
 * @returns
 */
const validateInput = (input, errorMsg) => {
  if (input.id === "email" || input.id === "birthdate") {
    let fieldValue = input.value.trim();
    if (fieldValue === "") {
      errorMsg.textContent = "Ce champ est obligatoire.";
      errorMsg.style.color = "red";
      errorMsg.style.fontSize = "12px";
      return false;
    } else if (input.id === "email") {
      // Check the email format witth regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fieldValue)) {
        errorMsg.textContent = "Veuillez saisir une adresse e-mail valide.";
        errorMsg.style.color = "red";
        errorMsg.style.fontSize = "12px";
        return false;
      } else {
        errorMsg.textContent = "";
        return true;
      }
    } else {
      errorMsg.textContent = "";
      return true;
    }
  } else {
    return validateName(input, errorMsg);
  }
};
/**
 * Check the quantity of game
 * @returns
 */
const checkQuantity = () => {
  const quantityInput = document.getElementById("quantity");
  const errorMsg = document.getElementById("errorMsg");
  //input value is empty or negative
  if (quantityInput.value === "" || quantityInput.value === "-0") {
    errorMsg.textContent = "Veuillez indiquer une quantité positive.";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "12px";
    return false;
  } else {
    errorMsg.textContent = "";
    return true;
  }
};

/**
 * Check the case
 * @param {*} checkbox
 * @param {*} errorMsg
 * @returns
 */
const validateCheckbox = (checkbox, errorMsg) => {
  if (!checkbox.checked) {
    errorMsg.textContent = "Veuillez accepter les conditions d'utilisation.";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "12px";
    return false;
  } else {
    errorMsg.textContent = "";
    return true;
  }
};

/**
 *  Display the cities selects
 * @param {*} errorMsg
 * @returns
 */
const validateCity = (errorMsg) => {
  const checkedRadio = document.querySelector('input[name="location"]:checked');
  if (!checkedRadio) {
    errorMsg.textContent = "Veuillez sélectionner une ville.";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "12px";
    return false;
  } else {
    errorMsg.textContent = "";
    return true;
  }
};

/**
 * Send the form with the variable
 * @returns
 */
const validate = () => {
  const isFirstNameValid = validateInput(first, errorFirstName);
  const isLastNameValid = validateInput(last, errorLastName);
  const isEmailValid = validateInput(email, errorEmail);
  const isBirthdateValid = validateInput(birthdate, errorDate);
  const isCheckboxValid = validateCheckbox(checkbox1, errorCondition);
  const isLocationValid = validateCity(errorRadio);
  const isCheckQuantity = checkQuantity();

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
