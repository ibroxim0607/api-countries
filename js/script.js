let elTemplate = document.getElementById("template").content;
let elForm = document.querySelector(".js-form-search");
let elInput = document.querySelector(".js-form-input");
let elCountriesList = document.querySelector("js-countries-list");
let elList = document.querySelector(".js-countries-list");
let elModal = document.querySelector(".js-modal-wrapper");
let elModalBody = elModal.querySelector(".modal-body");

let countrties = [];

// Template
function renderCountries(country) {
  elList.innerHTML = "";

  let elTemplateFragment = document.createDocumentFragment();
  country.forEach((country) => {
    let newTemplate = elTemplate.cloneNode(true);
    let templateItemClone = newTemplate.querySelector(".card");

    templateItemClone.querySelector(".card-img-top").src = country.flags.png;
    templateItemClone.querySelector(".card-img-top").alt = country.name.common;

    templateItemClone.querySelector(".card-title").textContent =
      country.name.common;

    templateItemClone.querySelector(
      ".card-text-1"
    ).innerHTML = `<srtong class="fw-bold">Population:</srtong> ${country.population.toLocaleString(
      "de-DE"
    )}`;

    templateItemClone.querySelector(
      ".card-text-2"
    ).innerHTML = `<strong class = "fw-bold">Sub-Region:</strong> ${country.subregion}`;
    templateItemClone.querySelector(
      ".card-text-3"
    ).innerHTML = `<strong class = "fw-bold">Capital:</strong> ${country.capital}`;
    templateItemClone.querySelector(
      ".card-text-4"
    ).innerHTML = `<strong class = "fw-bold">Map:</strong> <a href ="${country.maps.googleMaps}">Here</a> `;

    templateItemClone.querySelector(".btn-primary").value = country.cca2;
    // templateItemClone
    //   .querySelector(".btn-primary")
    //   .addEventListener("click", () => {
    //     elModalBody.textContent = country.capital;
    //   });

    elTemplateFragment.append(templateItemClone);
  });

  elList.append(elTemplateFragment);
}

// Error Function
function errorFunction(err) {
  elList.innerHTML = null;

  let errItem = document.createElement("li");
  errItem.className = "alert alert-danger";
  errItem.textContent = err;

  elList.append(errItem);
}

// FETCH
function searchCountry(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => {
      if (res.status != 200) {
        throw new Error(error("Sorry your contry is not found"));
      }

      return res.json();
    })
    .then((data) => {
      countrties = data;
      renderCountries(data);
    })
    .finally();
}

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  elList.innerHTML = null;

  let elInputValue = elInput.value.trim();
  searchCountry(elInputValue);

  elInput.value = "";
});

elList.addEventListener("click", (e) => {
  if (e.target.matches(".js-query")) {
    const countryCode = e.target.value;
    const currentCountry = countrties.find(
      (counrty) => counrty.cca2 == countryCode
    );
    const newP = document.createElement("p");
    newP.textContent = currentCountry.capital;
    newP.classList.add("text-capital");
    elModalBody.append(newP);
  }
});
