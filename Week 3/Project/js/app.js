"use strict";

const inputEl = document.querySelector(".input__text--box");
const charEl = document.querySelector("#characters");
const wordEl = document.querySelector("#words");
const sentEl = document.querySelector("#sentences");
const paraEl = document.querySelector("#paragraphs");
const spaceEl = document.querySelector("#spaces");
const letterEl = document.querySelector("#letters");
const digitEl = document.querySelector("#digits");
const specialCharEl = document.querySelector("#special-characters");

/////////////////////

const render = function () {
  const input = inputEl.value;

  const charactersCount = calcCharactersCount(input);
  charEl.innerHTML = charactersCount;

  const wordsCount = calcWordsCount(input);
  wordEl.innerHTML = wordsCount;

  const sentencesCount = calcSentencesCount(input);
  sentEl.innerHTML = sentencesCount;

  const paragraphsCount = calcParagraphsCount(input);
  paraEl.innerHTML = paragraphsCount;

  const spacesCount = calcSpacesCount(input);
  spaceEl.innerHTML = spacesCount;

  const lettersCount = calcLettersCount(input);
  letterEl.innerHTML = lettersCount;

  const digitsCount = calcDigitsCount(input);
  digitEl.innerHTML = digitsCount;

  const specialCharactersCount = calcSpecialCharactersCount(input);
  specialCharEl.innerHTML = specialCharactersCount;

};

const calcCharactersCount = function (str) {
  const output = str.length;

  return output === 0 ? "-" : output;
};

const calcWordsCount = function (str) {
  const output = str
    // replacing all the punctuation marks with "NaW", later to filter out.
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?\\]/g, "NaW")
    .split(" ")
    .filter((el) => (el === "NaW" ? false : true))
    .filter((el) => (el === "" ? false : true)).length;

  return output === 0 ? "-" : output;
};

const calcSentencesCount = function (str) {
  const output = str
    .split(/[.?:]/)
    // to filter out the string which starts only with punctuation mark.
    .filter((el) => (el.length === 1 ? false : true))
    // to trim down the white spaces which not contain any word so count will be correct.
    .filter((el) => (el.trim() === "" ? false : true)).length;

  return output === 0 ? "-" : output;
};

const calcParagraphsCount = function (str) {
  const output = str
    .split("\n\n")
    .filter((el) => (el.trim() === "" ? false : true)).length;

  return output === 0 ? "-" : output;
};

const calcSpacesCount = function (str) {
  const output = str.split(" ").length - 1;

  return output === 0 ? "-" : output;
};

const calcLettersCount = function (str) {
  const output = str.split(/[a-zA-Z]/g).length - 1;

  return output === 0 ? "-" : output;
};

const calcDigitsCount = function (str) {
  const output = str.split(/[0-9]/g).length - 1;

  return output === 0 ? "-" : output;
};

const calcSpecialCharactersCount = function(str) {
     const output =
       str.split(/[!@#\$%\^\&\*\(\)\-\_\=\+\[\{\]\}\\|;:'",<\.>\/\?]/g).length -
       1;

     return output === 0 ? "-" : output;
}

inputEl.addEventListener("keyup", render);
