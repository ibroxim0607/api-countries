let elSearchForm = document.querySelector(".js-search-form");
let elSearchInput = elSearchForm.querySelector(".js-search-input");
let elCountryInfo = document.querySelector(".js-country-info");
let elSpinner = document.querySelector(".js-spinner");


// const renderCountry = datum => {
//   elCountryInfo.innerHTML = "";

//   datum.forEach(data => {
//     let elContryMiniInfo = document.createElement("div");
//     elContryMiniInfo.innerHTML = `
//       <p>Country: ${data.name.official}</p>
//       <img src=${data.flags.png} alt=${data.name.official} width="300" height="200">`

//     elCountryInfo.appendChild(elContryMiniInfo);
//   })
// }


const renderCountry = datum => {
  elCountryInfo.innerHTML = ""

  datum.forEach(data => {
    let elCountryMiniInfo = document.createElement("div")
    let elCountryMiniImg = document.createElement("img")
    let elCountryMiniTitle = document.createElement("h5")

    elCountryMiniImg.src = data.flags.svg
    elCountryMiniImg.classList.add("card-img-top")

    elCountryMiniTitle.textContent = data.name.official
    elCountryMiniTitle.classList.add("card-title")

    elCountryMiniInfo.appendChild(elCountryMiniTitle, elCountryMiniImg)
    elCountryInfo.appendChild(elCountryMiniInfo)
  })
}

const renderError = err => {
  let elContryMiniInfo = document.createElement("div");
    elContryMiniInfo.innerHTML = `
      <p>${err}</p>
    `

    elCountryInfo.appendChild(elContryMiniInfo);
}

const getCountryData = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      if (!res.ok) {
      // if (res.status != 200) {
        throw new Error(renderError("Xatolik yuz berdi."));
      }

      return res.json()})
    .then(data => renderCountry(data))
    .catch(err => renderError(err))
}

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let value = elSearchInput.value.trim().toLowerCase();


  getCountryData(value);
})

console.log();