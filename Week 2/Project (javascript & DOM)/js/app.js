"use strict";

///////////////////////////////////////////////////////////////////////
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

let tasks = getLocalStorage() || [];

const setLocalStorage = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// setLocalStorage();

const form = document.querySelector(".form");
const taskInput = document.querySelector("#input-task");
const filterTab = document.querySelector(".filters");
const filters = document.querySelectorAll(".filter");
const list = document.querySelector(".list");
const taskItem = document.querySelectorAll(".list__item");
const emptyMessage = document.querySelector(".empty__message");
const btnClear = document.querySelector(".btn__clear");

let activeFilter = "all";
/////////////////

/////////////////
const addNewTask = function (e) {
  e.preventDefault();

  if (!taskInput.value) return;

  emptyMessage.classList.add("hidden");

  const newTask = {
    id: +tasks.length,
    name: taskInput.value,
    completed: false,
  };

  tasks.push(newTask);

  showTasks();
  taskInput.value = "";
  setLocalStorage();
};

/////////////////////
const showTasks = function (filter = "all") {
  list.innerHTML = "";
  emptyMessage.classList.add("hidden");

  let filteredTasks;

  if (filter === "all") filteredTasks = tasks.map((task) => task);

  if (filter === "pending")
    filteredTasks = tasks.filter((task) => task.completed === false);

  if (filter === "completed")
    filteredTasks = tasks.filter((task) => task.completed === true);

  if (!filteredTasks.length) {
    emptyMessage.classList.remove("hidden");
    return;
  }

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
const toggleCompletionOfTask = function (e) {
  const target = e.target;

  if (target.classList.contains("delete")) deleteTask(e);

  if (!target.classList.contains("check")) return;

  const parentEl = e.target.closest(".list__item");
  const name = parentEl.dataset.id;
  const taskIndex = tasks.findIndex(
    (task) => task.name === name.split(",").join(" ")
  );

  if (target.checked) markTaskComplete(taskIndex);
  else if (!target.checked) markTaskPending(taskIndex);
};

const markTaskComplete = function (index) {
  tasks[index].completed = true;
  showTasks(activeFilter);
  setLocalStorage();
};

const markTaskPending = function (index) {
  tasks[index].completed = false;
  showTasks(activeFilter);
  setLocalStorage();
};

////////////////////
const deleteTask = function (e) {
  const target = e.target;

  if (!target.classList.contains("delete")) return;

  const parentEl = e.target.closest(".list__item");
  const name = parentEl.dataset.id;
  const taskIndex = tasks.findIndex(
    (task) => task.name === name.split(",").join(" ")
  );

  tasks.splice(taskIndex, 1);
  showTasks(activeFilter);
  setLocalStorage();
};
////////////////////
const clearAllTasks = function () {
  if (!tasks.length) return;

  tasks = [];
  showTasks();
  setLocalStorage();
};

///////////////////
const init = function () {
  showTasks();
};

form.addEventListener("submit", addNewTask);
btnClear.addEventListener("click", clearAllTasks);
filterTab.addEventListener("click", filterTasks);
list.addEventListener("click", toggleCompletionOfTask);
init();
console.log(getLocalStorage());
