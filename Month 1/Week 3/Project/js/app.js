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

// function to render the updates in UI...
const render = function () {
  // input from user...
  const input = inputEl.value;

  // CHARACTERS (everything which moves the cursor forward is a character)
  const charactersCount = calcCharactersCount(input);
  charEl.innerHTML = charactersCount;

  // WORDS
  const wordsCount = calcWordsCount(input);
  wordEl.innerHTML = wordsCount;

  // SENTENCES (ends with punctuation mark [. ? :])
  const sentencesCount = calcSentencesCount(input);
  sentEl.innerHTML = sentencesCount;

  // PARAGRAPHS (starting new paragraph after two line breaks [ \n ])
  const paragraphsCount = calcParagraphsCount(input);
  paraEl.innerHTML = paragraphsCount;

  // SPACES (white spaces in the text)
  const spacesCount = calcSpacesCount(input);
  spaceEl.innerHTML = spacesCount;

  // LETTERS (english alphabets a-z A-Z)
  const lettersCount = calcLettersCount(input);
  letterEl.innerHTML = lettersCount;

  // DIGITS (digits from 0 - 9)
  const digitsCount = calcDigitsCount(input);
  digitEl.innerHTML = digitsCount;

  // SPECIAL CHARACTERS (. , ! ^ & * ~ # ETC...)
  const specialCharactersCount = calcSpecialCharactersCount(input);
  specialCharEl.innerHTML = specialCharactersCount;
};

// listening event whenever a key is pressed and lifted up...
inputEl.addEventListener("keyup", render);

/////////////////////////////////////////////////

// function to count characters in the input...
const calcCharactersCount = function (str) {
  const output = str.length;

  return output === 0 ? "-" : output;
};

// function to count total words present in the input...
const calcWordsCount = function (str) {
  const output = str
    // replacing all the punctuation marks with "NaW", later to filter out.
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?\\]/g, "NaW")
    .split(" ")
    .filter((el) => (el === "NaW" ? false : true))
    .filter((el) => (el === "" ? false : true)).length;

  return output === 0 ? "-" : output;
};

// function to count total sentences present in the input...
const calcSentencesCount = function (str) {
  const output = str
    .split(/[.?:]/)
    // to filter out the string which starts only with punctuation mark.
    .filter((el) => (el.length === 1 ? false : true))
    // to trim down the white spaces which not contain any word so count will be correct.
    .filter((el) => (el.trim() === "" ? false : true)).length;

  return output === 0 ? "-" : output;
};

// function to count total paragraphs present in the input...
const calcParagraphsCount = function (str) {
  const output = str
    .split("\n\n")
    .filter((el) => (el.trim() === "" ? false : true)).length;

  return output === 0 ? "-" : output;
};

// functionto count total spaces present in the input...
const calcSpacesCount = function (str) {
  const output = str.split(" ").length - 1;

  return output === 0 ? "-" : output;
};

// function to count total letters present in the input...
const calcLettersCount = function (str) {
  const output = str.split(/[a-zA-Z]/g).length - 1;

  return output === 0 ? "-" : output;
};

// function to count total digits present in the input...
const calcDigitsCount = function (str) {
  const output = str.split(/[0-9]/g).length - 1;

  return output === 0 ? "-" : output;
};

// function to calculate total special characters present in the input...
const calcSpecialCharactersCount = function (str) {
  const output =
    str.split(/[!@#\$%\^\&\*\(\)\-\_\=\+\[\{\]\}\\|;:'",<\.>\/\?]/g).length - 1;

  return output === 0 ? "-" : output;
};

////////////////////////////////////////////////////////////////////
