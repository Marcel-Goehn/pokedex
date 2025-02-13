let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=90&offset=0";
let pokemons = [];
let pokemonsData = [];


async function init() {
    let pokemonResponse = await fetchPokemons();
    let pokemonResponseObject = pokemonResponse;
    console.log(pokemonResponseObject);
    
    
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

        pokemonsData.push(
            {
                id : pokemonInformation.id,
                name : pokemonInformation.name,
                img : pokemonInformation.sprites.front_default,
                types : pokemonInformation.types,
                height : pokemonInformation.height,
                weight : pokemonInformation.weight,
                base_experience : pokemonInformation.base_experience,
                abilities : pokemonInformation.abilities,
                stats : pokemonInformation.stats,
            }
        );
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


function renderPokemonCards() {
    let cardsRef = document.getElementById('poke_gallery');
    cardsRef.innerHTML = ``;

    for (let i = 0; i < pokemonsData.length; i++) {
        cardsRef.innerHTML += getCardsTemplate(i);
    }
}


console.log(pokemons);
console.log(pokemonsData);

