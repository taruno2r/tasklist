"use strict";

// DATA
const List = ["Buy Groceries", "Go to Gym Today"];

let count = 0;

// ELEMENTS
const formInput = document.querySelector(".form-input");
const formButton = document.querySelector(".form-button");

const labelActive = document.querySelector(".label-active");
const labelCompleted = document.querySelector(".label-completed");

const activeContainer = document.querySelector(".to-do-list");
const completedContainer = document.querySelector(".completed-list");

const listItem = document.querySelectorAll(".to-do-list-item");
const completedItem = document.querySelectorAll(".completed-list-item");
const labelItem = document.querySelectorAll(".item-text");
const markDone = document.querySelectorAll(".mark-done");
const hideShowCompleted = document.querySelector(".hide-show");
const deleteButton = document.querySelector(".icon-button");

// INITIAL PAGE LOAD
activeContainer.style.opacity = 100;
labelItem.forEach((item, i) => (item.textContent = List[i]));
activeContainer.innerHTML = "";
completedContainer.innerHTML = "";
labelCompleted.style.display = labelActive.style.display = "none";

let hidden = true;

//////////////////
//FUNCTIONS
//////////////////

// DISPLAY THE ITEM
const displayToDo = function (text) {
  if (activeContainer.innerHTML == "") {
    labelActive.style.display = "block";
  }
  const html = `<div class="to-do-list-item">
        <p class="item-text item-${count}">${text}</p>
        <span class="mark-done link">Mark as Done</span>
        <button class="icon-button">
          <ion-icon class="icon" name="trash-outline"></ion-icon>
        </button>
      </div>`;
  activeContainer.insertAdjacentHTML("afterbegin", html);
};

//////////////////
// EVENT HANDLERS
//////////////////

// Adding AN ITEM
formButton.addEventListener("click", function (e) {
  e.preventDefault();

  const input = formInput.value;
  if (input != "") {
    count++;
    List.push(input);
    displayToDo(input);
    formInput.value = "";
    formInput.focus();
  }
});

// MARKING AN ITEM COMPLETE
activeContainer.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("mark-done")) {
    e.preventDefault();

    if (completedContainer.innerHTML == "") {
      labelCompleted.style.display = "flex";
      completedContainer.style.display = "none";
    }

    const item = e.target.closest(".to-do-list-item");
    const iconButton = item.querySelector(".icon-button");

    e.target.style.display = "none";
    iconButton.style.display = "none";
    e.target.closest(".to-do-list-item").style.opacity = "40%";
    completedContainer.insertBefore(
      e.target.closest(".to-do-list-item"),
      completedContainer.firstChild
    );
  }

  if (activeContainer.innerHTML == "") {
    labelActive.style.display = "none";
  }
});

// DELETING AN ITEM
activeContainer.addEventListener("click", function (e) {
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
