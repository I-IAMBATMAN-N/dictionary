"use strict";
const defaultWord = {
  word: "universe",
  phonetic: "/ˈjuːnɪˌvɜːs/",
  phonetics: [
    {
      text: "/ˈjuːnɪˌvɜːs/",
      audio: "",
    },
    {
      text: "/ˈjuːnəˌvɝs/",
      audio:
        "https://api.dictionaryapi.dev/media/pronunciations/en/universe-us.mp3",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=1763069",
      license: {
        name: "BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
  ],
  meanings: [
    {
      partOfSpeech: "proper noun",
      definitions: [
        {
          definition:
            "Our universe, the sum of everything that exists in the cosmos, including time and space itself.",
          synonyms: [],
          antonyms: [],
          example:
            "Powerful telescopes look far back into the distant reaches of the Universe.",
        },
      ],
      synonyms: [],
      antonyms: [],
    },
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition:
            "The sum of everything that exists in the cosmos, including time and space itself.",
          synonyms: [],
          antonyms: [],
          example:
            "I think that the universe was created by a life force rather than a deity.",
        },
        {
          definition:
            "An entity similar to our universe; one component of a larger entity known as the multiverse.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "Everything under consideration.",
          synonyms: [],
          antonyms: [],
          example:
            "In all this universe of possibilities, there is only one feasible option.",
        },
        {
          definition: "A sample taken from the population.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "An imaginary collection of worlds.",
          synonyms: [],
          antonyms: [],
          example: "The universe in this comic book series is richly imagined.",
        },
        {
          definition:
            "(films) A collection of stories with characters and settings that are less interrelated than those of sequels or prequels.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A whole world, in the sense of perspective or social setting.",
          synonyms: [],
          antonyms: [],
          example: "That didn’t just rock my world, it rocked my universe.",
        },
      ],
      synonyms: [],
      antonyms: [],
    },
  ],
  license: {
    name: "CC BY-SA 3.0",
    url: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  sourceUrls: [
    "https://en.wiktionary.org/wiki/Universe",
    "https://en.wiktionary.org/wiki/universe",
  ],
};

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
  word.innerText = finalData.word;

  // console.log("HERANDNOW", finalData.phonetics[0].text);
  prunounce.innerText =
    finalData.phonetics[finalData.phonetics.length - 1].text;

  audio.src =
    finalData.phonetics[finalData.phonetics.length - 1].audio || "nosource";
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
  fillUpper(defaultWord);
  fillLower(defaultWord);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const [finalData] = data;

        // console.log(finalData);

        fillUpper(finalData);
        fillLower(finalData);
        // console.log(fillLower(finalData));

        //
        word.innerText =
          input.value.length > 0 ? input.value : defaultWord.word;
      })
      .catch((err) => {
        // console.log(err);

        prunounce.innerText = `/${input.value}`;

        audio.src = "nosource";

        let element = `<h3 class="synonym">
      No such word in dictionary
      </h3>`;
        mainSection.innerHTML = element;
      });
  });

  playBtn.addEventListener("click", function (e) {
    // console.log(audio.src);
    audio.src.search("nosource") > -1 ? alert("no audio file") : audio.play();
  });

  input.addEventListener("input", function (e) {
    //
    if (regExpNum.test(e.target.value)) {
      alert("Please input no numbers in dictionary input field");
      e.target.value = "Universe";
    }
  });
});
