//------ BASIC INFO -------//
// On page load focus on first text field
window.addEventListener('load', () => document.getElementById('name').focus());

// hide other job role text input / show when "other" option is selected from job role dropdown
const otherInput = document.getElementById('other-title');
const titleSelect = document.getElementById('title');
otherInput.style.display = 'none';

titleSelect.addEventListener('change', () => {
  if (titleSelect.options[5].selected) {
    otherInput.style.display = 'block';
  } else {
    otherInput.style.display = 'none';
  }
});

//------ T-SHIRT INFO -------//
// Filter color options by selected theme
// When form is loaded, update "Design" and "Color" fields to tell user to select theme before color
// Hide "Select Theme" option in "Design" menu
const designSelect = document.getElementById('design');
designSelect.options[0].style.display = 'none';

// Hide "Color" label and select menu until T-Shirt design is selected
const colorLabel = document.querySelector('label[for="color"]');
const colorSelect = document.getElementById('color');
colorLabel.style.display = 'none';
colorSelect.style.display = 'none';

// Hide the colors in the "Color" drop down menu
for (let i = 0; i < colorSelect.options.length; i++) {
  colorSelect.options[i].style.display = 'none';
}

// Update "Color" field when corresponding color theme is selected in "Design" drop down
designSelect.addEventListener('change', (e) => {
  colorLabel.style.display = 'block';
  colorSelect.style.display = 'block';
  // if "js puns" is selected
  if (e.target.value === 'js puns') {
    // hide the "heart js" option elements
    for (let i = 0; i < colorSelect.options.length; i++) {
      if (i >= 3) {
        colorSelect.options[i].style.display = 'none';
      }
      // show the "js puns" element
      if (i < 3) {
        colorSelect.options[i].style.display = 'block';
      }
      colorSelect.value = colorSelect.options[0].value;
    }
  }

  // if "heart js" is selected
  if (e.target.value === 'heart js') {
    // hide the "js puns" option elements
    for (let i = 0; i < colorSelect.options.length; i++) {
      if (i < 3) {
        colorSelect.options[i].style.display = 'none';
      }
      // show the "heart js" option elements
      if (i >= 3) {
        colorSelect.options[i].style.display = 'block';
      }
      colorSelect.value = colorSelect.options[3].value;
    }
  }
});

//------ REGISTER FOR ACTIVITIES -------//
// When checkboxes are selected, tally total at the bottom of section
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const activitySection = document.querySelector('.activities');
const totalCostDiv = document.createElement('div');
activitySection.append(totalCostDiv);
let totalCost = 0;

// listen for changes in the activity section
activitySection.addEventListener('change', (e) => {
  // target checkbox input
  let activity = e.target;

  // grab the values from the data-cost attribute
  let activityCost = parseInt(activity.dataset.cost);

  // grab the values from the data-day-and-time attribute
  let activityTime = activity.dataset.dayAndTime;

  // check if checkbox is checked
  if (activity.checked) {
    // if true add cost of activity to total cost
    totalCost += activityCost;
  } else {
    // if false subtract cost of activity from total cost
    totalCost -= activityCost;
  }

  totalCostDiv.removeAttribute('style');
  totalCostDiv.textContent = 'Total: $' + totalCost;

  // When an activity is selected that conflicts with another activity, conflicting activity is disabled
  // loop over checkbox inputs
  for (let i = 0; i < checkboxes.length; i++) {
    if (
      checkboxes[i].dataset.dayAndTime === activityTime &&
      activity !== checkboxes[i]
    ) {
      if (activity.checked) {
        checkboxes[i].disabled = true;
      } else {
        checkboxes[i].disabled = false;
      }
    }
  }
});

//------ PAYMENT SECTION -------//
const paymentOptions = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

// Hide the paypal and bitcoin text initially
payPal.style.display = 'none';
bitcoin.style.display = 'none';

// Hide the "Select Payment Method" option
const selectMethod = document.querySelector('option[value="select method"]');
selectMethod.style.display = 'none';

// Event Listener to determine which payment option is selected
paymentOptions.addEventListener('change', () => {
  if (paymentOptions.value === 'credit card') {
    creditCard.style.display = 'block';
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (paymentOptions.value === 'paypal') {
    creditCard.style.display = 'none';
    payPal.style.display = 'block';
    bitcoin.style.display = 'none';
  } else if (paymentOptions.value === 'bitcoin') {
    creditCard.style.display = 'none';
    payPal.style.display = 'none';
    bitcoin.style.display = 'block';
  }
});

//------ FORM VALIDATION -------//
// Function to validate Name input field
// Checks that value is present
const validateName = () => {
  const nameInput = document.getElementById('name');
  // If value is present
  if (nameInput.value) {
    // Remove error indicators and return true
    nameInput.removeAttribute('placeholder');
    nameInput.removeAttribute('style');
    return true;
  } else {
    // If value is not present add error indicators and return false
    nameInput.placeholder = "Field can't be blank";
    nameInput.style.borderColor = 'red';
    return false;
  }
};

// Function to validate Email input field
// Checks that value is present and validly formatted email address
const validateEmail = () => {
  const emailInput = document.getElementById('mail');
  const emailValid = /\S+@\S+\.\S+/;
  const isEmailValid = emailValid.test(emailInput.value);
  // If value is present and valid email
  if (emailInput.value && isEmailValid === true) {
    // Remove error indicators and return true
    emailInput.removeAttribute('placeholder');
    emailInput.removeAttribute('style');
    return true;
  } else {
    // If value is not present add error indicators and return false
    emailInput.placeholder = "Field can't be blank";
    emailInput.style.borderColor = 'red';
    return false;
  }
};

// Function to validate Activities input field
// Checks that at least 1 checkbox is checked
const validateActivities = () => {
  // Variable to hold how many boxes are checked
  let checkedBoxes = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedBoxes += 1;
    }
  }

  if (checkedBoxes === 0) {
    totalCostDiv.textContent = 'Please select an activity';
    totalCostDiv.style.color = 'red';
  }
};

// Function to validate Card Number input field
// Checks that value is present and between 13 and 16 digits and a number
const validateCardNumber = () => {
  const ccNumInput = document.getElementById('cc-num');
  const ccNumInputNumber = parseInt(ccNumInput.value);
  // If value is present and correct length and a number
  if (
    ccNumInput.value &&
    ccNumInput.value.length >= 13 &&
    ccNumInput.value.length <= 16 &&
    isNaN(ccNumInputNumber) === false
  ) {
    // Remove error indicators and return true
    ccNumInput.removeAttribute('style');
    return true;
  } else {
    // Else add error indicators and return false
    ccNumInput.style.borderColor = 'red';
    return false;
  }
};

// Function to validate Zip Code input field
// Checks that value is present and a 5 digit number
const validateZip = () => {
  const zipInput = document.getElementById('zip');
  const zipInputNumber = parseInt(zipInput.value);
  // If value is present and correct length and a number
  if (
    zipInput.value &&
    zipInput.value.length === 5 &&
    isNaN(zipInputNumber) === false
  ) {
    // Remove error indicators and return true
    zipInput.removeAttribute('style');
    return true;
  } else {
    // Else add error indicators and return false
    zipInput.style.borderColor = 'red';
    return false;
  }
};

// Function to validate CVV input field
// Checks that value is present and a 3 digit number
const validateCVV = () => {
  const cvvInput = document.getElementById('cvv');
  const cvvInputNumber = parseInt(cvvInput.value);
  // If value is present and correct length and a number
  if (
    cvvInput.value &&
    cvvInput.value.length === 3 &&
    isNaN(cvvInputNumber) === false
  ) {
    // Remove error indicators and return true
    cvvInput.removeAttribute('style');
    return true;
  } else {
    // Else add error indicators and return false
    cvvInput.style.borderColor = 'red';
    return false;
  }
};

// Master validation function
const validateAll = () => {
  validateName();
  validateEmail();
  validateActivities();

  // If "credit card" is selected payment method, run credit card validation
  if (paymentOptions.value === 'credit card') {
    validateCardNumber();
    validateZip();
    validateCVV();
  }

  if (
    validateName() &&
    validateEmail() &&
    validateActivities() &&
    validateCardNumber() &&
    validateZip() &&
    validateCVV()
  ) {
    return true;
  } else {
    return false;
  }
};

const registerBtn = document.querySelector('button[type="submit"]');

registerBtn.addEventListener('click', (e) => {
  validateAll();
  if (validateAll() === false) {
    e.preventDefault();
  }
});
