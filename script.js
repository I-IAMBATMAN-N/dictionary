"use strict";

const form = document.querySelector("form");
const input = document.querySelector(".input");
const mainBtn = document.querySelector(".btn");

const playBtn = document.querySelector(".btn__play");
const mainSection = document.querySelector(".section.lower");

const word = document.querySelector(".word");
const prunounce = document.querySelector(".prunounce");
const audio = document.querySelector(".audio");

const meaningNoun = document.querySelectorAll(".meaning")[0];
const meaningVerb = document.querySelectorAll(".meaning")[1];

const regExpNum = /[0-9]/;

function fillUpper(finalData) {
  console.log("finalData", finalData);
  word.innerText = finalData.word;

  const phoneticsObj = finalData?.phonetics?.find(i => i?.audio?.length);
  prunounce.innerText = phoneticsObj.text || "\\";
  audio.src = finalData.audioSample;
}
function fillLower(object) {
  // console.log("object", object);
  if (object !== null || object !== undefined) {
    mainSection.innerHTML = "";
    function fillPartOfSpeech(arr) {
      let element1 = document.createElement("div");
      let element2 = document.createElement("ul");
      element2.classList.add("list");
      arr.forEach((item) => {
        element2.innerHTML += `
        <li class="list-item">
          <span>
            <ion-icon name="caret-forward-outline"></ion-icon>
          </span> ${item.definition}
        </li>
      `;
      });
      // console.log(element2.innerHTML);
      element1.appendChild(element2);
      return element1.innerHTML;
    }

    function fillSynonyms(array) {
      let string = "";
      array.forEach((item, index) => {
        // console.log(index);
        // console.log(array.length);
        string += item + (index !== array.length - 1 ? ", " : "");
      });
      return string;
    }

    let element = document.createElement("div");
    object.meanings.forEach((meaning) => {
      element.innerHTML += `
      <h3 class="partOfSpeech">${meaning.partOfSpeech}</h3>
      <h4 class="synonym">${
        meaning.synonyms.length > 0
          ? "Synonyms: </br></br>" + fillSynonyms(meaning.synonyms)
          : ""
      }</h4>
        ${fillPartOfSpeech(meaning.definitions)}
    `;
    });
    // mainSection.innerHTML = "";
    // mainSection.innerHTML += element;
    // console.log(element.innerHTML);

    mainSection.appendChild(element);
  }
}

window.addEventListener("load", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value.trim().toLowerCase()}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const finalData = {...data[0], audioSample: `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${input.value.trim().toLowerCase()}--_us_1.mp3`};
        // console.log(finalData);

        fillUpper(finalData);
        fillLower(finalData);
        // console.log(fillLower(finalData));

        word.innerText =
          input.value.length > 0 ? input.value : defaultWord.word;

        console.log("data", data);
      })
      .catch((err) => {
        // console.error(err);
        word.innerText = input.value.trim().toLowerCase();

        prunounce.innerText = `/`;
        audio.src = "nosource";
        mainSection.innerHTML = `<h3 class="synonym">No such word in dictionary</h3>`;
      });
  });

  playBtn.addEventListener("click", function (e) {
    console.log(audio.src);
    audio.src.search("nosource") > -1 ? alert("no audio file") : audio.play().catch(error => {
      alert("Playback failed:", error);
      // console.error("Playback failed:", error);
    });
  });

  form.requestSubmit();
});
