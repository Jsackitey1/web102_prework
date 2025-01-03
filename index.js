/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i=0;i<games.length;i++){
         // create a new div element, which will become the game card

         const gameCard = document.createElement('div');

         gameCard.classList.add('game-card');

         gameCard.innerHTML = `
         <h1>${games[i].name}</h1>
         <p>${games[i].description}</p>
         <p><strong>Pledged:</strong> $${games[i].pledged}</p>
         <p><strong>Goal:</strong> $${games[i].goal}</p>
         <p><strong>Backers:</strong> ${games[i].backers}</p>
         <img class="game-img" src="${games[i].img}" alt="${games[i].name}">
     `;
        gamesContainer.appendChild(gameCard);
    }

    }



// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const contributions=[];

for (let i =0;i<GAMES_JSON.length;i++){
    contributions.push(GAMES_JSON[i].backers);
}
// use reduce() to count the number of total contributions by summing the backers

const sumWithInitial = contributions.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `${sumWithInitial.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totRaised=[]
for (let i =0;i<GAMES_JSON.length;i++){
    totRaised.push(GAMES_JSON[i].pledged);
}

const totalAmount = totRaised.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
// set inner HTML using template literal
raisedCard.innerHTML="$" + `${totalAmount.toLocaleString()}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const count=GAMES_JSON.length;
gamesCard.innerHTML=`${count}`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {

    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    const unFundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
 
    // use the function we previously created to add the unfunded games to the DOM
   addGamesToPage(unFundedGames);

   //console.log(`Number of unfunded games: ${unfundedGames.length}`);
   
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

    //console.log(`Number of funded games: ${fundedGames.length}`);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
function countUnfundedGames() {
    const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length; 
    const fundedCount = GAMES_JSON.filter(game => game.pledged > game.goal).length; 

    const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
    const totalGoal = GAMES_JSON.reduce((acc, game) => acc + game.goal, 0);

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `A total of, $${totalPledged.toLocaleString()} has been raised towards a collective goal of $${totalGoal.toLocaleString()}. There ${unfundedCount === 1 ? 'is' : 'are'} ${unfundedCount} unfunded game${unfundedCount === 1 ? '' : 's'} remaining. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = descriptionText;
    descriptionContainer.appendChild(descriptionElement);
}
countUnfundedGames();

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const[first,second, ...rest]=sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `${first.name}`;

const secondGameElement = document.createElement("p");
secondGameElement.textContent = `${second.name}`;

// do the same for the runner up item

firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);