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

// Update "Color" field to read "Please select a T-shirt theme
const colorSelect = document.getElementById('color');
colorSelect.style.display = 'none';

// Hide the colors in the "Color" drop down menu
for (let i = 0; i < colorSelect.options.length; i++) {
  colorSelect.options[i].style.display = 'none';
}

// Update "Color" field when corresponding color theme is selected in "Design" drop down
designSelect.addEventListener('change', (e) => {
  colorSelect.style.display = 'block';
  // if "js puns" is selected
  if (e.target.value === 'js puns') {
    console.log('js puns');
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
    console.log('heart js');
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

  totalCostDiv.textContent = 'Total: $' + totalCost;

  // When an activity is selected that conflicts with another activity, conflicting activity is disabled
  // loop over checkbox inputs
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i]);
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
