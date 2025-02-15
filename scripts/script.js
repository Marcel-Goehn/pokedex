let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
let pokemons = [];
let pokemonsData = [];
let pokemonsFetchedEvoChain = [];
const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');


async function init() {
    let pokemonResponse = await fetchPokemons();
    let pokemonResponseObject = pokemonResponse;
    for (let i = 0; i < pokemonResponseObject.results.length; i++) {
        pokemons.push(
            pokemonResponseObject.results[i].url
        );
    }
    storePokemonData();
}


async function fetchPokemons() {
    try {
        let response = await fetch(BASE_URL);
        if(!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);   
    }
}


async function storePokemonData() {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemonInformation = await fetchPokemonData(i);
        let pokemonEvoChain = await fetchEvoChain(pokemonInformation);
        pokemonsData.push(pokemonInformation);
        pokemonsFetchedEvoChain.push(pokemonEvoChain);
    }
    renderPokemonCards();
}


async function fetchPokemonData(index) {
    try {
        let response = await fetch(pokemons[index]);
        if(!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


async function fetchEvoChain(pokemonInformation) {
    try {
        let firstResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInformation.id}`);
        if(!firstResponse.ok) {
            throw new Error(`HTTP Fehler! Status: ${firstResponse.status}`);
        }
        let firstData = await firstResponse.json();
        let secondResponse = await fetch(firstData.evolution_chain.url);
        if(!secondResponse.ok) {
            throw new Error(`HTTP Fehler! Status: ${secondResponse.status}`);
        }
        let secondData = await secondResponse.json();
        return secondData;
    }
    catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


function renderPokemonCards() {
    let cardsRef = document.getElementById('poke_gallery');
    cardsRef.innerHTML = ``;

    for (let i = 0; i < pokemonsData.length; i++) {
        cardsRef.innerHTML += getCardsTemplate(i);
    }
}


function showDialog(i) {
    wrapper.innerHTML = getDialogTemplate(i);
    dialog.showModal();
}


function closeDialog() {
    dialog.close();
}


dialog.onclick = function(e) {
    if(!wrapper.contains(e.target)) {
        dialog.close();
    }
}


function showMain(i) {
    document.getElementById('main_table' + i).classList.remove('d_none');
    document.getElementById('main_button' + i).classList.add('red-underline');
    document.getElementById('stats_table' + i).classList.add('d_none');
    document.getElementById('stats_button' + i).classList.remove('red-underline');
}


function showStats(i) {
    document.getElementById('stats_table' + i).classList.remove('d_none');
    document.getElementById('stats_button' + i).classList.add('red-underline');
    document.getElementById('main_table' + i).classList.add('d_none');
    document.getElementById('main_button' + i).classList.remove('red-underline');
}


console.log(pokemonsData);
console.log(pokemonsFetchedEvoChain);



