"use strict";

let tasks = [
  {
    id: 0,
    name: "Go for a movie",
    completed: false,
  },
  {
    id: 1,
    name: "Buy Groceries",
    completed: true,
  },
  {
    id: 2,
    name: "Go to GYM",
    completed: false,
  },
];

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

  filteredTasks.forEach((task, i) => {
    const html = `
           <li class="list__item" data-id=${i + 0}>
            <div>
              <input type="checkbox" class="check" ${
                task.completed === true ? "checked" : ""
              } data-id=${i}/>
              <p class="task">${task.name}</p>
            </div>
            <i class="fa-solid fa-ellipsis options"></i>
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

  if (!target.classList.contains("check")) return;

  const parentEl = e.target.closest("li");
  const id = +parentEl.dataset.id;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (target.checked) markTaskComplete(taskIndex);
  else if (!target.checked) markTaskPending(taskIndex);
};

const markTaskComplete = function (index) {
  tasks[index].completed = true;
  showTasks(activeFilter);
};

const markTaskPending = function (index) {
  tasks[index].completed = false;
  showTasks(activeFilter);
};

////////////////////
const clearAllTasks = function () {
  if (!tasks.length) return;

  tasks = [];
  showTasks();
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
