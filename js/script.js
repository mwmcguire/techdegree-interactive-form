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

activitySection.addEventListener('change', () => {
  let activity = document.querySelector('input[type="checkbox"]:checked');
  console.log(activity);

  let activityCost = parseInt(activity.dataset.cost);
  console.log(activityCost);
  console.log(typeof activityCost);

  if (activity === 'checked') {
    console.log('checked');
  } else {
    console.log('unchecked');
  }
});

// const checkbox = document.querySelector('input[type="checkbox"]');

// let activity = {
//   isChecked: false,
//   day: ,
//   time: '',
//   cost: 0,
// };
// When an activity is selected that conflicts with another activity, conflicting activity is grayed out
