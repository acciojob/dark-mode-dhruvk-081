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

btn.addEventListener("click", toggleTheme);

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
