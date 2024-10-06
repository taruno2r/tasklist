"use strict";

// ELEMENTS
const body = document.querySelector("body");

const formInput = document.querySelector(".form-input");
const formButton = document.querySelector(".form-button");

const labelActive = document.querySelector(".label-active");
const labelCompleted = document.querySelector(".label-completed");

const activeContainer = document.querySelector(".to-do-list");
const completedContainer = document.querySelector(".completed-list");
const hideShowCompleted = document.querySelector(".hide-show");

const toast = document.querySelector(".toast-container");

// INITIAL PAGE LOAD

activeContainer.innerHTML = "";
completedContainer.innerHTML = "";
labelCompleted.style.display =
  labelActive.style.display =
  toast.style.display =
    "none";

let hidden = true;
let toastClicked = false;

//////////////////
//FUNCTIONS
//////////////////

// TOAST MESSAGE
const showToast = function () {
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 5000);
  toast.addEventListener("click", function (e) {
    if (e.target.classList.contains("toast-button")) {
      toastClicked = true;
      console.log(toastClicked);
      return toastClicked;
    }
  });
};

// DISPLAY THE ITEM
const displayToDo = function (text) {
  if (activeContainer.innerHTML == "") {
    labelActive.style.display = "block";
  }
  const now = new Date();
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const html = `<div class="to-do-list-item">
        <ion-icon class="icon-done" name="ellipse-outline"></ion-icon>
        <div class="text-container">
        <p class="item-date">${new Intl.DateTimeFormat(
          navigator.locale,
          options
        ).format(now)}</p>
        <p class="item-text">${text}</p>
          </div>
        <button class="icon-button">
          <ion-icon class="icon" name="trash-outline"></ion-icon>
        </button>
      </div>`;
  activeContainer.insertAdjacentHTML("afterbegin", html);
};

//////////////////
// EVENT HANDLERS
//////////////////

// HOVER ON CIRCLE
activeContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("icon-done"))
    e.target.setAttribute("name", "checkmark-outline");
});

activeContainer.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("icon-done"))
    e.target.setAttribute("name", "ellipse-outline");
});

// ADDING A NEW TASK
formButton.addEventListener("click", function (e) {
  e.preventDefault();

  const input = formInput.value;
  if (input != "") {
    displayToDo(input);
    formInput.value = "";
    formInput.focus();
  }
});

// MARKING AN ITEM COMPLETE
activeContainer.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("icon-done")) {
    e.preventDefault();
    const now = new Date();
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    if (completedContainer.innerHTML == "") {
      labelCompleted.style.display = "flex";
      completedContainer.style.display = "none";
    }

    const item = e.target.closest(".to-do-list-item");
    const iconButton = item.querySelector(".icon-button");
    const itemCompletedDateTime = item.querySelector(".item-date");
    itemCompletedDateTime.textContent = `${new Intl.DateTimeFormat(
      navigator.locale,
      options
    ).format(now)}`;

    e.target.style.color = "#2f9e44";
    e.target.setAttribute("name", "checkmark-done-outline");
    e.target.setAttribute("background-color", "#2f9e44");

    e.target
      .closest(".to-do-list-item")
      .querySelector(".text-container").style.opacity = "40%";
    completedContainer.insertBefore(
      e.target.closest(".to-do-list-item"),
      completedContainer.firstChild
    );
  }

  if (activeContainer.innerHTML == "") {
    labelActive.style.display = "none";
  }
});

// MARKING AN ITEM AS NOT DONE
completedContainer.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("icon-done")) {
    e.preventDefault();
    const now = new Date();
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const item = e.target.closest(".to-do-list-item");
    const itemCompletedDateTime = item.querySelector(".item-date");
    itemCompletedDateTime.textContent = `${new Intl.DateTimeFormat(
      navigator.locale,
      options
    ).format(now)}`;

    e.target.style.color = "#333";

    e.target
      .closest(".to-do-list-item")
      .querySelector(".text-container").style.opacity = "100%";
    activeContainer.insertBefore(
      e.target.closest(".to-do-list-item"),
      activeContainer.firstChild
    );
  }

  if (completedContainer.innerHTML == "") {
    labelCompleted.style.display = "none";
    hideShowCompleted.textContent = "Show";
    hidden = true;
  }
});

// DELETING AN ITEM
body.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("icon-button") ||
    e.target.classList.contains("icon")
  ) {
    e.preventDefault();
    const item = e.target.closest(".to-do-list-item");
    item.outerHTML = "";
  }
  if (activeContainer.innerHTML == "") {
    labelActive.style.display = "none";
  }
  if (completedContainer.innerHTML == "") {
    labelCompleted.style.display = "none";
    hideShowCompleted.textContent = "Show";
    hidden = true;
  }
});

// HIDING THE COMPLETED TASKS
hideShowCompleted.addEventListener("click", function (e) {
  e.preventDefault();
  if (hidden == false) {
    completedContainer.style.display = "none";
    hideShowCompleted.textContent = "Show";
    hidden = true;
  } else {
    completedContainer.style.display = "flex";
    hideShowCompleted.textContent = "Hide";
    hidden = false;
  }
});
