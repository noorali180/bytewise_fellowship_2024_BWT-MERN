"use strict";

///////////////////////////////////////////////////////////////////////

// To get all the tasks saved in the local storage...
const getLocalStorage = function () {
  return JSON.parse(localStorage.getItem("tasks"));
};

///////////////////////////////////////////////////////////////////////

// let tasks = [
//   {
//     id: 0,
//     name: "Go for a movie",
//     completed: false,
//   },
//   {
//     id: 1,
//     name: "Buy Groceries",
//     completed: true,
//   },
//   {
//     id: 2,
//     name: "Go to GYM",
//     completed: false,
//   },
// ];

// Tasks array....
let tasks = getLocalStorage() || [];

const setLocalStorage = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// setLocalStorage();

// Selecting the elements from the DOM...
const form = document.querySelector(".form");
const taskInput = document.querySelector("#input-task");
const filterTab = document.querySelector(".filters");
const filters = document.querySelectorAll(".filter");
const list = document.querySelector(".list");
const taskItem = document.querySelectorAll(".list__item");
const emptyMessage = document.querySelector(".empty__message");
const btnClear = document.querySelector(".btn__clear");

// variable to activate the desired filter (all, pending, completed)
let activeFilter = "all";
/////////////////

/////////////////

// Adding a new task...
const addNewTask = function (e) {
  e.preventDefault();

  // If the input is empty return...
  if (!taskInput.value) return;

  emptyMessage.classList.add("hidden");

  // new task item on the basis of input...
  const newTask = {
    id: +tasks.length,
    name: taskInput.value,
    completed: false,
  };

  // maintaining the task array by pushing the new task, later to save in the local storage...
  tasks.push(newTask);

  showTasks();
  taskInput.value = "";
  setLocalStorage();
};

/////////////////////

// To render all the tasks...
const showTasks = function (filter = "all") {
  list.innerHTML = "";
  emptyMessage.classList.add("hidden");

  let filteredTasks;

  // showing tasks on the basis filter variable...
  if (filter === "all") filteredTasks = tasks.map((task) => task);

  if (filter === "pending")
    filteredTasks = tasks.filter((task) => task.completed === false);

  if (filter === "completed")
    filteredTasks = tasks.filter((task) => task.completed === true);

  // If there is no task then show empty message on the screen...
  if (!filteredTasks.length) {
    emptyMessage.classList.remove("hidden");
    return;
  }

  // Generating html markup to append in the DOM, inside list component...
  filteredTasks.forEach((task) => {
    const html = `
           <li class="list__item" data-id=${task.name.split(" ").join()}>
            <div>
              <input type="checkbox" class="check" ${
                task.completed === true ? "checked" : ""
              } />
              <p class="task">${task.name}</p>
            </div>
            <i class="fa-solid fa-trash-can delete"></i>
          </li>
     `;

    list.insertAdjacentHTML("afterbegin", html);
  });
};

////////////////

// To listen the event on filters tab, and showing the desired list of tasks on its basis...
const filterTasks = function (e) {
  const target = e.target;

  if (!target.classList.contains("filter")) return;

  filters.forEach((filter) => filter.classList.remove("active"));
  target.classList.add("active");
  activeFilter = document.querySelector(".filter.active").dataset.filter;

  const filter = target.dataset.filter;
  showTasks(filter);
};

///////////////////

// Responding to the click event on checkboxes of each task, and toggling it to "completed" of "pending"...
const toggleCompletionOfTask = function (e) {
  const target = e.target;

  // to divert the flow of the function whenever user is intended to delete a task...
  if (target.classList.contains("delete")) deleteTask(e);

  // if check box is not clicked then return from the function...
  if (!target.classList.contains("check")) return;

  const parentEl = e.target.closest(".list__item");
  const name = parentEl.dataset.id;
  const taskIndex = tasks.findIndex(
    (task) => task.name === name.split(",").join(" ")
  );

  if (target.checked) markTaskComplete(taskIndex);
  else if (!target.checked) markTaskPending(taskIndex);
};

// To mark task as completed on the basis of clicked item index, and updating the localStorage...
const markTaskComplete = function (index) {
  tasks[index].completed = true;
  showTasks(activeFilter);
  setLocalStorage();
};

// To mark task as pending on the basis of clicked item index, and updating the localStorage...
const markTaskPending = function (index) {
  tasks[index].completed = false;
  showTasks(activeFilter);
  setLocalStorage();
};

////////////////////

// Delete a particular task on the basis of clicked item...
const deleteTask = function (e) {
  const target = e.target;

  if (!target.classList.contains("delete")) return;

  const parentEl = e.target.closest(".list__item");
  const name = parentEl.dataset.id;
  const taskIndex = tasks.findIndex(
    (task) => task.name === name.split(",").join(" ")
  );

  // deleting the task, updating the UI, and updating the localStorage...
  tasks.splice(taskIndex, 1);
  showTasks(activeFilter);
  setLocalStorage();
};
////////////////////

////////////////////
// To clear all the tasks at once...
const clearAllTasks = function () {
  if (!tasks.length) return;

  tasks = [];
  showTasks();
  setLocalStorage();
};

///////////////////

// initial condition of showing tasks...
const init = function () {
  showTasks();
};

// listening submit event on form item, to fetch the user input and update tasks with new added task...
form.addEventListener("submit", addNewTask);
// listening click event on clearALl button,
btnClear.addEventListener("click", clearAllTasks);
// listening click event on filters tab,
filterTab.addEventListener("click", filterTasks);
// listening click event on each tasks, to mark as "completed" or "pending" and deletion of task as well...
list.addEventListener("click", toggleCompletionOfTask);

// initializing...
init();
