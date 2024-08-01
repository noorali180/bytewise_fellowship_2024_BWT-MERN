"use strict";

const container = document.querySelector(".container");

let newX,
  newY,
  startX,
  startY = 0;

const mouseDown = function (e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
};

const mouseMove = function (e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  // container.style.top = startY + 'px';
  // container.style.left = startX + 'px';

  container.style.top = container.offsetTop - newY + "px";
  container.style.left = container.offsetLeft - newX + "px";
};

const mouseUp = function () {
  document.removeEventListener("mousemove", mouseMove);
};
container.addEventListener("mousedown", mouseDown);
