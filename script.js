"use strict";

// ELEMENTS
const body = document.querySelector("body");

const formInput = document.querySelector(".form-input");
const formButton = document.querySelector(".form-button");

const tabs = document.querySelector(".tab-container");
const tabActive = document.querySelector(".tab-active");
const tabCompleted = document.querySelector(".tab-completed");

const activeContainer = document.querySelector(".active-container");
const completedContainer = document.querySelector(".completed-container");

const toast = document.querySelector(".toast-container");

// INITIAL PAGE LOAD
activeContainer.innerHTML = "";
completedContainer.innerHTML = "";
toast.style.display = "none";

let hidden = true;
let toastClicked = false;
let activeCount = 0;
let completedCount = 0;

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
    // labelActive.style.display = "block";
  }
  const html = `<div class="to-do-list-item">
        <ion-icon class="icon-done" name="ellipse-outline"></ion-icon>
        <p class="item-text">${text}</p>
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
    activeCount++;
    tabActive.textContent = `Active (${activeCount})`;
    // Activating Active Tab
    activeContainer.style.display = "block";
    completedContainer.style.display = "none";
    tabCompleted.classList.remove("tab-current");
    tabActive.classList.add("tab-current");
  }
});

// MARKING AN ITEM COMPLETE
activeContainer.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("icon-done")) {
    e.preventDefault();

    if (completedContainer.innerHTML == "") {
      completedContainer.style.display = "none";
    }

    const item = e.target.closest(".to-do-list-item");
    const iconButton = item.querySelector(".icon-button");

    e.target.style.color = "#2f9e44";
    e.target.setAttribute("name", "checkmark-done-outline");
    e.target.setAttribute("background-color", "#2f9e44");

    e.target
      .closest(".to-do-list-item")
      .querySelector(".item-text").style.opacity = "40%";
    completedContainer.insertBefore(
      e.target.closest(".to-do-list-item"),
      completedContainer.firstChild
    );
    activeCount--;
    tabActive.textContent = `Active (${activeCount})`;
    completedCount++;
    tabCompleted.textContent = `Completed (${completedCount})`;
  }

  if (activeContainer.innerHTML == "") {
    // labelActive.style.display = "none";
  }
});

// MARKING AN ITEM AS NOT DONE
completedContainer.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("icon-done")) {
    e.preventDefault();
    const item = e.target.closest(".to-do-list-item");

    e.target.style.color = "#333";

    e.target
      .closest(".to-do-list-item")
      .querySelector(".item-text").style.opacity = "100%";
    activeContainer.insertBefore(
      e.target.closest(".to-do-list-item"),
      activeContainer.firstChild
    );
    activeCount++;
    tabActive.textContent = `Active (${activeCount})`;
    completedCount--;
    tabCompleted.textContent = `Completed (${completedCount})`;
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
    if (e.target.closest(".active-container")) {
      activeCount--;
      tabActive.textContent = `Active (${activeCount})`;
    }
    if (e.target.closest(".completed-container")) {
      completedCount--;
      tabCompleted.textContent = `Completed (${completedCount})`;
    }
    item.outerHTML = "";
  }
  if (activeContainer.innerHTML == "") {
  }
});

// TAB SELECTION
tabs.addEventListener("click", function (e) {
  if (e.target.classList.contains("tab-active")) {
    activeContainer.style.display = "block";
    completedContainer.style.display = "none";
    tabCompleted.classList.remove("tab-current");
    tabActive.classList.add("tab-current");
  }
  if (e.target.classList.contains("tab-completed")) {
    completedContainer.style.display = "block";
    activeContainer.style.display = "none";
    tabActive.classList.remove("tab-current");
    tabCompleted.classList.add("tab-current");
  }
});
