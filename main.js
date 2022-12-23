let result = document.querySelector("#result");
let searchBtn = document.querySelector("#search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let userInput = document.querySelector("#user-inp");

searchBtn.addEventListener("click", searchResult);

function aresult() {
  if (window.event.keyCode == 13) {
    searchResult();
  }
}

function searchResult() {
  let userInputValue = userInput.value;
  if (userInputValue.length == 0) {
    result.innerHTML = `<h3>Input something</h3>`;
  } else {
    fetch(url + userInputValue)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];

        console.log(myMeal);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strYoutube);
        console.log(myMeal.strInstructions);

        let count = 1;
        let ingredients = [];

        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);

        result.innerHTML = `
        <div id="details">
          <div id="left-box">
              <img src=${myMeal.strMealThumb}>
              <h2><b>${myMeal.strMeal}</b></h2>
              <h4>${myMeal.strArea}</h4>
          </div>
          <div id="ingredient-con"></div>
      </div>
      <div id="bottom-box">
      <button id="show-recipe"><i class="fa-solid fa-utensils"><b> Recipe </b></i></button>
          <div id="recipe" style="display:none">
              <button id="hide-recipe">X</button>
              <div id="instructions" >${myMeal.strInstructions}</div>
          </div>

          <a href="${myMeal.strYoutube}" target="_blank"><button id="show-youtube"><i class="fa-brands fa-youtube"><b>Video</b></i></button></a>
      </div>`;
        let ingredientCon = document.querySelector("#ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.querySelector("#recipe");
        let hideRecipe = document.querySelector("#hide-recipe");
        let showRecipe = document.querySelector("#show-recipe");
        let instructions = document.querySelector("#instructions");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Please enter correctly </h3>`;
      });
  }
}
