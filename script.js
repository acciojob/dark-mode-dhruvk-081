let body = document.getElementsByTagName("body")[0];
let btn = document.querySelector(".btn");
let heading = document.querySelector("h1");
let darkModeEnabled = localStorage.getItem("darkModeEnabled");

if (darkModeEnabled === null) {
  darkModeEnabled = "false";
  localStorage.setItem("darkModeEnabled", darkModeEnabled);
}

if (darkModeEnabled === "true") {
  enableDarkMode();
} else {
  disableDarkMode();
}

// btn.addEventListener("click", toggleTheme);

const chk = document.getElementById('chk');

chk.addEventListener('change', toggleTheme);

function toggleTheme() {
  if (darkModeEnabled === "true") {
    darkModeEnabled = "false";
    disableDarkMode();
  } else {
    darkModeEnabled = "true";
    enableDarkMode();
  }
  localStorage.setItem("darkModeEnabled", darkModeEnabled);
}

function enableDarkMode() {
  body.classList.add("darkMode");
  heading.textContent = "Dark Mode";
}

function disableDarkMode() {
  body.classList.remove("darkMode");
  heading.textContent = "Light Mode";
}

// ------------------------------------------------
const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", saveFormData);

function saveFormData(event) {
  event.preventDefault();
  const formData = new FormData(myForm);
  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  localStorage.setItem("formData", JSON.stringify(data));
  alert("Form data saved successfully!");
}

window.addEventListener("DOMContentLoaded", fillFormWithData);

function fillFormWithData() {
  const savedData = localStorage.getItem("formData");

  if (savedData) {
    const data = JSON.parse(savedData);

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        document.getElementById(key).value = data[key];
      }
    }
  }
}

// Cypress test cases
// ------------------------------------------------

// Test case 1
() => {
  // Fill out form
  cy.get('#name').type('John Doe');
  cy.get('#email').type('john@example.com');
  cy.get('#phone').type('555-555-5555');

  // Submit form
  cy.get('input[type="submit"]').click();

  // Check that form data was saved to localStorage
  cy.window().then(win => {
    const forms = JSON.parse(win.localStorage.getItem('forms'));
    expect(forms).to.have.length(1);
    expect(forms[0]).to.deep.equal({ name: 'John Doe', email: 'john@example.com', phone: '555-555-5555' });
  });
}

// Test case 2
() => {
  // Save form data to localStorage
  cy.window().then(win => {
    win.localStorage.setItem('forms', JSON.stringify([{ name: 'Jane Doe', email: 'jane@example.com', phone: '123-456-7890' }]));
  });

  // Reload page
  cy.visit(baseUrl);

  // Check that form is auto-filled
  cy.get('#name').should('have.value', 'Jane Doe');
  cy.get('#email').should('have.value', 'jane@example.com');
  cy.get('#phone').should('have.value', '123-456-7890');
}
