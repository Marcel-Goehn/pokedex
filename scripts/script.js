let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let pokemons = [];
let pokemonsData = [];


async function init() {
    let pokemonResponse = await fetchPokemons();
    let pokemonResponseArray = pokemonResponse;
    console.log(pokemonResponseArray);
    
    
    for (let i = 0; i < pokemonResponseArray.results.length; i++) {
        pokemons.push(
            pokemonResponseArray.results[i].url
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
                img : pokemonInformation.sprites.front_default
            }
        );
    }
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


function test() {
    document.getElementById('experiment').setAttribute("src", `${pokemonsData[0].img}`);
    document.getElementById('experiment').style = "width: 250px;";
}


console.log(pokemons);
console.log(pokemonsData);

