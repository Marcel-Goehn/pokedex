let URL_START = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${URL_START}`;
let pokemons = [];
let pokemonsCopy = [];
let pokemonsData = [];
let pokemonsFetchedEvoChain = [];
const dialog = document.getElementById('overlay');
const wrapper = document.querySelector('.wrapper');


async function init() {
    loadingSpinner();
    pokemons = [];
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
        let pokemonEvoChain = await fetchEvoChainOne(pokemonInformation);
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


async function fetchEvoChainOne(pokemonInformation) {
    try {
        let firstResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInformation.id}`);
        if(!firstResponse.ok) {
            throw new Error(`HTTP Fehler! Status: ${firstResponse.status}`);
        }
        let firstData = await firstResponse.json();
        return fetchEvoChainTwo(firstData);
    }
    catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}


async function fetchEvoChainTwo(data) {
    let secondResponse = await fetch(data.evolution_chain.url);
    if(!secondResponse.ok) {
        throw new Error(`HTTP Fehler! Status: ${secondResponse.status}`);
    }
    let secondData = await secondResponse.json();
    return secondData;
}


function fetchMorePokemons() {
    URL_START += 20;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${URL_START}`;
    let cardsRef = document.getElementById('poke_gallery');
    cardsRef.innerHTML = ``;
    disableRenderBtn();
    init();
}


function loadingSpinner() {
    let cardsRef = document.getElementById('poke_gallery');
    cardsRef.innerHTML = getLoadingSpinnerTemplate();
}


function renderPokemonCards() {
    let cardsRef = document.getElementById('poke_gallery');
    cardsRef.innerHTML = ``;
    pokemonsCopy = [];

    for (let i = 0; i < pokemonsData.length; i++) {
        pokemonsCopy.push(structuredClone(pokemonsData[i]));
        cardsRef.innerHTML += getCardsTemplate(i);
    }
    maxRenderLenght();
}


function renderFilteredPokemons() {
    let filteredPokemonsRef = document.getElementById('poke_gallery');
    filteredPokemonsRef.innerHTML = ``;

    for (let i = 0; i < pokemonsCopy.length; i++) {
        filteredPokemonsRef.innerHTML += getCardsTemplate(i);
    }
}


function enableRenderBtn() {
    document.getElementById('loading_btn').classList.remove('d_none');
}


function disableRenderBtn() {
    document.getElementById('loading_btn').classList.add('d_none');
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


function showPokemonCharacteristics(firstId, secondId, thirdId, fourthId, fifthId, sixthId) {
    document.getElementById(firstId).classList.remove('d_none');
    document.getElementById(secondId).classList.add('red-underline');
    document.getElementById(thirdId).classList.add('d_none');
    document.getElementById(fourthId).classList.remove('red-underline');
    document.getElementById(fifthId).classList.add('d_none');
    document.getElementById(sixthId).classList.remove('red-underline');
}


function previousPokemon(i, event) {
    event.stopPropagation();
    let result = (i - 1 + pokemonsCopy.length) % pokemonsCopy.length;
    showDialog(result);
}


function nextPokemon(i, event) {
    event.stopPropagation();
    let result = (i + 1) % pokemonsCopy.length;
    showDialog(result);
}


function getInputValue() {
    let inputRef = document.getElementById('input_search');
    let inputValue = inputRef.value;
    if(inputValue.length < 3 && inputValue.length > 0) {
        document.getElementById('requirement').classList.remove('d_none');
    }
    if(inputValue.length >= 3 || inputValue.length == 0) {
        document.getElementById('requirement').classList.add('d_none');
        filterPokemons(inputValue);
    }      
}


function filterPokemons(value) {
    pokemonsCopy = pokemonsData.filter(element => element.name.includes(value));
    if(pokemonsCopy == 0) {
        let writeEmptyRef = document.getElementById('poke_gallery');
        writeEmptyRef.innerHTML = getEmptyNoteTemplate();
        return;
    }
    renderFilteredPokemons();
}


function maxRenderLenght() {
    if (pokemonsData.length == 140) {
        disableRenderBtn();
    }
    else {
        enableRenderBtn();
    }
}


function pokemonStats(i, j, max, template) {
    let getStat = Number(pokemonsCopy[i].stats[j].base_stat);
    let calculation = (getStat / max) * 100;
    let roundendCalculation = Math.round(calculation);
    let calculationRef = template(roundendCalculation);
    return calculationRef;
}



