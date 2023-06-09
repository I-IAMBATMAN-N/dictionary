// import { axios } from "@pipedream/platform";
// export default defineComponent({
//   props: {
//     swapi: {
//       type: "app",
//       app: "swapi",
//     },
//   },
//   async run({ steps, $ }) {
//     return await axios($, {
//       url: `https://swapi.dev/api/films/1/`,
//     });
//   },
// });

const mainSection = document.querySelector(".main-section");

// fetch("https://swapi.py4e.com/api/vehicles")
//   .then((response) => {
//     return response.json();
//   })
//   .then((finalData) => {
//     const data = finalData;
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// fetch("https://the-one-api.dev/v2/book")
//   .then((response) => {
//     return response.json();
//   })
//   .then((finalData) => {
//     const data = finalData;
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// fetch("https://api.publicapis.org/entries")
//   .then((response) => {
//     return response.json();
//   })
//   .then((finalData) => {
//     const data = finalData;
//     console.log(data);

//     // for (let index = 0; index < 100; index++) {
//     //   mainSection.innerHTML += `
//     //   <h3>${data.entries[index].API}</h3>
//     //   <div>${data.entries[index].Description}</div>
//     // `;
//     // }

//     data.entries.forEach((entry) => {
//       mainSection.innerHTML += `

//       <h3>${entry.API}</h3>
//       <div>${entry.Description}</div>
//     `;
//     });
//   })
//   .catch((err) => console.log(err));

// fetch("https://www.whenisthenextmcufilm.com/")
//   .then((response) => {
//     return response.json();
//   })
//   .then((finalData) => {
//     const data = finalData;
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// fetch("https://imdb-api.com/en/API/Top250Movies/k_hqi7674x")
//   .then((res) => res.json())
//   .then((json) => {
//     console.log("json", json);

//     let htmlEl;

//     // json.results.forEach((result) => {
//     //   htmlEl += `
//     //   <h3>${result.title}</h3>
//     //   <div>${result.description}</div>
//     //   `;
//     // });
//     console.log("items", json.items);
//     let counter;
//     json.items.forEach((result) => {
//       counter++;
//       if (counter === 50) {
//         return;
//       }
//       htmlEl += `
//       <h3>${result.title}</h3>
//       <div>${result.description}</div>
//       `;
//     });

//     mainSection.innerHTML += htmlEl;
//   });

fetch("https://data.alpaca.markets/v2")
  .then((response) => {
    return response.json();
  })
  .then((finalData) => {
    const data = finalData;
    console.log(data);
  })
  .catch((err) => console.log(err));
