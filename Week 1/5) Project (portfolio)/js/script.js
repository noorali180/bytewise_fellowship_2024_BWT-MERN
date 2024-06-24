"use strict";

// accordion functionality...

const accordion = document.querySelectorAll(".accordion__grid");

const toggleAccordion = function (e) {
  const targetBtn = e.target;

  if (!targetBtn.classList.contains("accordion__btn")) return;

  const hiddenBox = targetBtn
    .closest(".accordion__grid")
    .querySelector(".hidden-box");

  if (targetBtn.innerText === "+") targetBtn.innerText = "x";
  else targetBtn.innerText = "+";

  hiddenBox.classList.toggle("hidden");
};

accordion.forEach((el) => {
  el.addEventListener("click", toggleAccordion);
});
