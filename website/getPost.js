//EXAMPLE - the client side code that would make a GET request to the animal info API
//Web API with fetch

//set up the URL
let baseURL = "http://api.animalinfo.org/data/?animal="; //imagined API
let apiKey = "&appid=9f15e45060..."; //imagined key

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const fav = document.getElementById("fav").value;
  const animal = document.getElementById("animal").value;
  console.log(fav, animal);
  // Faking an API call
  getAnimal("/fakeAnimalData")
    .then(function (data) {
      postData("/addAnimal", { animal: animal, fact: data.fact, fav: fav });
    })
    .then(function () {
      updateUI();
    });
}

//POST example
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getAnimal = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("animalName").innerHTML = allData[0].animal;
    document.getElementById("animalFact").innerHTML = allData[0].facts;
    document.getElementById("animalFav").innerHTML = allData[0].fav;
  } catch (error) {
    console.log("error", error);
  }
};


