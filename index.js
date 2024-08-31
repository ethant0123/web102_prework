/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
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

    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        const gamesContainer = document.getElementById('games-container');
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

contributionsCard.textContent = totalContributions;

const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

raisedCard.textContent = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;
gamesCard.textContent = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged > game.goal);
    addGamesToPage(fundedGames);
}

filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

// (Optional) Call the function to see the result
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const UnfundedGamesTotal = unfundedGames.length;

console.log(`Number of unfunded games: ${UnfundedGamesTotal}`);

// create a string that explains the number of unfunded games using the ternary operator
// Calculate the total amount raised and the number of funded games
const raised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const gametotal = GAMES_JSON.length;
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create a string that explains the total amount raised, number of funded games, and number of unfunded games
const summary = `
    A total of $${raised.toLocaleString()} has been raised for ${gametotal} ${gametotal === 1 ? 'game' : 'games'}.
    ${numUnfundedGames === 0 ? 'All games are fully funded!' : `Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? 'game remains unfunded' : 'games remain unfunded'}. 
    We need your help to fund these amazing games!`}
`;

console.log(summary);


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.innerHTML = summary;
descriptionContainer.appendChild(paragraph);

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
const [topGame, second] = sortedGames;

// Extract game names for display or further use
const topGameName = topGame.name;
const secondName = second.name;

console.log(`Top funded game: ${topGameName}`);
console.log(`Second most funded game: ${secondName}`);

const topGameElement = document.createElement('p');
topGameElement.textContent = `Top Funded Game: ${topGame.name}`;
firstGameContainer.appendChild(topGameElement);

// Create and append a new element for the second most funded game
const secondElement = document.createElement('p');
secondElement.textContent = `Second Most Funded Game: ${second.name}`;
secondGameContainer.appendChild(secondElement);