//your JS code here. If required.
let body = document.getElementsByTagName("body")[0];
let btn = document.querySelector("button");
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
